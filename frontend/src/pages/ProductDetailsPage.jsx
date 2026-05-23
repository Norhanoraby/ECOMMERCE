import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedProduct, fetchProductById } = useProductStore();
  const { addToCart } = useCartStore();
  const { user } = useUserStore();

  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (!selectedProduct) return <p>Loading...</p>;

  const sizeOptionsByCategory = {
    jeans: ["Small", "Medium", "Large"],
    blouse: ["Small", "Medium", "Large"],
    dress: ["Small", "Medium", "Large"],
    shoes: ["37", "38", "39", "40", "41", "42"],
  };

  const sizes = sizeOptionsByCategory[selectedProduct.category] || [];

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login or sign up to add items to your cart", {
        id: "login-required",
        duration: 2000,
      });

      navigate("/login");
      return;
    }

    const finalSize = sizes.length > 0 ? selectedSize : "One Size";

    if (!finalSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      ...selectedProduct,
      selectedSize: String(finalSize),
    });
  };

  const allSoldOut = selectedProduct.inventory.every(
    (item) => item.quantity === 0
  );

  return (
    <div className="min-h-screen bg-[#F8F5F2] px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full h-[600px] object-cover rounded"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {selectedProduct.name}
          </h1>

          <p className="text-2xl mb-6">EGP {selectedProduct.price}</p>

          <p className="text-gray-600 mb-8">
            {selectedProduct.description}
          </p>

          {selectedProduct.inventory?.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold mb-4">Choose Size</h3>

              <div className="flex gap-3 flex-wrap">
                {selectedProduct.inventory.map((item) => (
                  <button
                    key={item.size}
                    disabled={item.quantity === 0}
                    onClick={() => setSelectedSize(String(item.size))}
                    className={`px-5 py-2 border ${
                      item.quantity === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : selectedSize === item.size
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {item.size} {item.quantity === 0 && "(Sold Out)"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={allSoldOut}
            className={`px-8 py-4 text-white ${
              allSoldOut ? "bg-gray-400 cursor-not-allowed" : "bg-black"
            }`}
          >
            {allSoldOut ? "Will Be Restocked Soon" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;