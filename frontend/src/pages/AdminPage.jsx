import { PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-[#F8F5F2] text-[#1A1A1A] px-6 py-20">
      <div className="container mx-auto">
        <motion.h1
          className="text-3xl font-bold uppercase tracking-wide text-center text-[#1A1A1A]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <p className="text-center mt-4 text-[#6B6B6B]">
          Manage your store products and create new fashion items.
        </p>

        <hr className="mt-6 border-t border-gray-300 w-1/2 mx-auto" />

        <div className="flex justify-center mt-8 mb-10 gap-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-5 py-3 border text-sm font-bold uppercase tracking-widest transition duration-200 ${
                activeTab === tab.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-[#1A1A1A] border-[#E5E0DA] hover:bg-[#EFEAE5]"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          className="bg-white border border-[#E5E0DA] shadow-sm rounded-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === "create" && <CreateProductForm />}
          {activeTab === "products" && <ProductsList />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;