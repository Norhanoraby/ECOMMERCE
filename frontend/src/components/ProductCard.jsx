import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			addToCart(product);
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-md border border-[#E5E0DA] bg-white shadow-sm hover:shadow-md transition duration-300'>
			<Link to={`/product/${product._id}`}>
				<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-md border border-[#E5E0DA] bg-[#F8F5F2]'>
					<img className='object-cover w-full' src={product.image} alt='product image' />
				</div>
			</Link>

			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-bold tracking-wide text-[#1A1A1A]'>{product.name}</h5>
				<div className='mt-2 mb-5 flex items-center justify-between'>
					<p>
						<span className='text-2xl font-bold text-[#1A1A1A]'> EGP {product.price}</span>
					</p>
				</div>
				<button
					className='flex w-full items-center justify-center rounded-none border border-black bg-black px-5 py-3 text-center text-sm font-bold uppercase tracking-widest text-white hover:bg-[#333333] focus:outline-none transition duration-200'
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className='mr-2' />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;