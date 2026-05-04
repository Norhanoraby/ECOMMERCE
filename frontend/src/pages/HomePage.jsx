import React from 'react'
import CategoryItem from "../components/CategoryItem";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/blouse", name: "blouse", imageUrl: "/blouse.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/watches", name: "watches", imageUrl: "/watches.jpg" },
	{ href: "/purse", name: "purse", imageUrl: "/purse1.jpg" },
	{ href: "/dress", name: "dress", imageUrl: "/dress.jpg" },
];

function HomePage() {
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
    </div>
  );
};

export default HomePage;