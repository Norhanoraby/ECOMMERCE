import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const {
    deleteProduct,
    toggleFeaturedProduct,
    products,
    updateProductPrice,
    updateProductInventory,
  } = useProductStore();

  const [editedPrices, setEditedPrices] = useState({});
  const [editedInventory, setEditedInventory] = useState({});

  return (
    <motion.div
      className="bg-white border border-[#E5E0DA] shadow-sm rounded-md overflow-hidden max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-6 py-5 border-b border-[#E5E0DA]">
        <h2 className="text-2xl font-bold text-[#1A1A1A] uppercase tracking-wide">
          Products List
        </h2>
        <p className="mt-2 text-sm text-[#6B6B6B]">
          View, feature, edit price, update stock, and delete products.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#E5E0DA]">
          <thead className="bg-[#F8F5F2]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
                Featured
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
                Inventory
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-[#E5E0DA]">
            {products?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-[#F8F5F2] transition duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-md object-cover border border-[#E5E0DA]"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="ml-4 text-sm font-semibold text-[#1A1A1A]">
                      {product.name}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    value={editedPrices[product._id] ?? product.price}
                    onChange={(e) =>
                      setEditedPrices({
                        ...editedPrices,
                        [product._id]: e.target.value,
                      })
                    }
                    className="w-24 border px-2 py-1"
                  />

                  <button
                    onClick={() =>
                      updateProductPrice(
                        product._id,
                        editedPrices[product._id] ?? product.price
                      )
                    }
                    className="ml-2 bg-black text-white px-3 py-1 text-xs"
                  >
                    Save
                  </button>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-[#F8F5F2] text-[#6B6B6B] border border-[#E5E0DA] rounded-full">
                    {product.category}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-2 border rounded-full transition duration-200 ${
                      product.isFeatured
                        ? "bg-black text-white border-black"
                        : "bg-white text-[#6B6B6B] border-[#E5E0DA] hover:bg-[#EFEAE5]"
                    }`}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        product.isFeatured ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </td>

                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {product.inventory?.map((item) => {
                      const key = `${product._id}-${item.size}`;

                      return (
                        <div key={item.size} className="flex items-center gap-2">
                          <span className="w-20 text-sm font-semibold">
                            {item.size}
                          </span>

                          <input
                            type="number"
                            min="0"
                            value={editedInventory[key] ?? item.quantity}
                            onChange={(e) =>
                              setEditedInventory({
                                ...editedInventory,
                                [key]: e.target.value,
                              })
                            }
                            className="w-20 border px-2 py-1"
                          />

                          <button
                            onClick={() =>
                              updateProductInventory(
                                product._id,
                                item.size,
                                editedInventory[key] ?? item.quantity
                              )
                            }
                            className="bg-black text-white px-3 py-1 text-xs"
                          >
                            Save
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition duration-200"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}

            {products?.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-sm text-[#6B6B6B]"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsList;