import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	return (
		<Link
			to={`/product/${product._id}`}
			className='flex w-full relative flex-col overflow-hidden rounded-md border border-[#E5E0DA] bg-white shadow-sm hover:shadow-md transition duration-300'
		>
			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-md border border-[#E5E0DA] bg-[#F8F5F2]'>
				<img className='object-cover w-full' src={product.image} alt='product image' />
			</div>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-bold tracking-wide text-[#1A1A1A]'>{product.name}</h5>

				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-2xl font-bold text-[#1A1A1A]'>
							EGP {product.price}
						</span>
					</p>
				</div>

				<div className='flex w-full items-center justify-center border border-black bg-black px-5 py-3 text-sm font-bold uppercase tracking-widest text-white'>
					View Details
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;