import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "https://res.cloudinary.com/dfxlqthrs/image/upload/v1779817100/jeans_uklzto.jpg" },
	{ href: "/blouse", name: "blouse", imageUrl: "https://res.cloudinary.com/dfxlqthrs/image/upload/v1779817076/blouse_pn8rsz.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "https://res.cloudinary.com/dfxlqthrs/image/upload/v1779817137/shoes_osdaqb.jpg" },
	{ href: "/watches", name: "watches", imageUrl: "https://res.cloudinary.com/dfxlqthrs/image/upload/v1779817146/watches_ablkt2.jpg" },
	{ href: "/purse", name: "purse", imageUrl: "https://res.cloudinary.com/dfxlqthrs/image/upload/v1779817117/purse1_hkr5nl.jpg" },
	{ href: "/dress", name: "dress", imageUrl: "https://res.cloudinary.com/dfxlqthrs/image/upload/v1779817090/dress_zykbew.jpg" },
];
function HomePage() {
	const {
	fetchFeaturedProducts,
	featuredProducts,
	featuredLoading,
} = useProductStore();
    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

  return (
  <div className="min-h-screen bg-[#F8F5F2] text-[#1A1A1A] px-6 py-20">
      <h1 className="text-3xl font-bold uppercase tracking-wide text-center">
        Welcome to Maison zcnf
      </h1>
      <p className="text-center mt-4 text-[#6B6B6B]">
       Curated fashion designed to make every moment feel like a statement.
      </p>
      <hr className="mt-6 border-t border-gray-300 w-1/2 mx-auto" />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
        {!featuredLoading && featuredProducts.length > 0 && (
  <FeaturedProducts featuredProducts={featuredProducts} />
)}
    </div>
  );
};

export default HomePage;