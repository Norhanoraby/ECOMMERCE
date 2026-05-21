import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  console.log("products", products);

  return (
    <motion.div
      className="bg-white border border-[#E5E0DA] shadow-sm rounded-md overflow-hidden max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="px-6 py-5 border-b border-[#E5E0DA]">
        <h2 className="text-2xl font-bold text-[#1A1A1A] uppercase tracking-wide">
          Products List
        </h2>
        <p className="mt-2 text-sm text-[#6B6B6B]">
          View, feature, and delete products from your store.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#E5E0DA]">
          <thead className="bg-[#F8F5F2]">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest"
              >
                Product
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest"
              >
                Price
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest"
              >
                Category
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest"
              >
                Featured
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-bold text-[#6B6B6B] uppercase tracking-widest"
              >
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
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-md object-cover border border-[#E5E0DA]"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>

                    <div className="ml-4">
                      <div className="text-sm font-semibold text-[#1A1A1A]">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-[#1A1A1A]">
                    EGP {product.price.toFixed(2)}
                  </div>
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
                  colSpan="5"
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