import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;

      const safeImage = (img) => {
        if (img && (img.startsWith("http://") || img.startsWith("https://"))) {
          return img;
        }
        return "https://via.placeholder.com/150";
      };

      return {
        price_data: {
          currency: "egp",
          product_data: {
            name: `${product.name} - ${product.selectedSize}`,
            images: [safeImage(product.image)],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }
    const newOrder = new Order({
     user: req.user._id,
     products: products.map((product) => ({
     product: product._id,
     quantity: product.quantity,
     price: product.price,
     selectedSize: product.selectedSize,
      })),
       totalAmount: totalAmount / 100,
       stripeSessionId: null,
      });

await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        orderId: newOrder._id.toString(),
      },
    });

    if (totalAmount >= 1000000) {
      await createNewCoupon(req.user._id);
    }

    newOrder.stripeSessionId = session.id;
    await newOrder.save();

    res.status(200).json({
      id: session.id,
      totalAmount: totalAmount / 100,
    });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({
      message: "Error processing checkout",
      error: error.message,
    });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          {
            isActive: false,
          }
        );
      }

      const order = await Order.findById(session.metadata.orderId);

     if (!order) {
     return res.status(404).json({ message: "Order not found" });
     }

      const products = order.products;

      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) continue;

        const inventoryItem = product.inventory.find(
          (inv) => inv.size === item.selectedSize
        );

        if (inventoryItem) {
          inventoryItem.quantity = Math.max(
            0,
            inventoryItem.quantity - item.quantity
          );
        }

        await product.save();
      }

      order.stripeSessionId = sessionId;
      order.totalAmount = session.amount_total / 100;
      await order.save();

      await User.findByIdAndUpdate(session.metadata.userId, {
        cartItems: [],
      });

      res.status(200).json({
        success: true,
        message: "Payment successful, order created, stock updated.",
        orderId: order._id,
      });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId,
  });

  await newCoupon.save();

  return newCoupon;
}