import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products, loading } = useProductStore();
	const { category } = useParams();

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	return (
		<div className='min-h-screen bg-[#F8F5F2] text-[#1A1A1A]'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-[#1A1A1A] uppercase tracking-wide mb-4'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<p className='text-center text-[#6B6B6B] mb-6'>
					Explore our curated collection.
				</p>

				<hr className='mb-10 border-t border-gray-300 w-1/2 mx-auto' />

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{loading && (
						<h2 className='text-2xl font-bold text-[#1A1A1A] uppercase tracking-wide text-center col-span-full bg-white border border-[#E5E0DA] shadow-sm rounded-md px-10 py-8'>
							Loading products...
						</h2>
					)}

					{!loading && products?.length === 0 && (
						<h2 className='text-2xl font-bold text-[#1A1A1A] uppercase tracking-wide text-center col-span-full bg-white border border-[#E5E0DA] shadow-sm rounded-md px-10 py-8'>
							No products found
						</h2>
					)}

					{!loading &&
						products?.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
				</motion.div>
			</div>
		</div>
	);
};

export default CategoryPage;