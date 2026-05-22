import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	selectedProduct: null,
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},
	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	fetchProductsByCategory: async (category) => {
		set({ loading: true , products: []});
		try {
			const response = await axios.get(`/products/category/${category}`);
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response?.data?.error  || "Failed to fetch products");
		}
	},
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
	toggleFeaturedProduct: async (productId) => {
	const currentProduct = useProductStore
		.getState()
		.products.find((product) => product._id === productId);

	const oldValue = currentProduct?.isFeatured;
	const newValue = !oldValue;

	set((state) => ({
		products: state.products.map((product) =>
			product._id === productId
				? { ...product, isFeatured: newValue }
				: product
		),
	}));

	try {
		const response = await axios.patch(`/products/${productId}`);
		const updatedProduct = response.data.updatedProduct;

		set((state) => ({
			products: state.products.map((product) =>
				product._id === productId
					? { ...product, isFeatured: updatedProduct.isFeatured }
					: product
			),
		}));
	} catch (error) {
		set((state) => ({
			products: state.products.map((product) =>
				product._id === productId
					? { ...product, isFeatured: oldValue }
					: product
			),
		}));

		toast.error(error.response?.data?.error || "Failed to update product");
	}
},
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			console.log(response.data);
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},

	
	
	updateProductPrice: async (productId, price) => {
	try {
		const response = await axios.patch(`/products/${productId}/price`, {
			price: Number(price),
		});

		const updatedProduct = response.data.updatedProduct;

		set((state) => ({
			products: state.products.map((product) =>
				product._id === productId ? updatedProduct : product
			),
		}));

		toast.success("Price updated");
	} catch (error) {
		toast.error(error.response?.data?.message || "Failed to update price");
	}
},

updateProductInventory: async (productId, size, quantity) => {
	try {
		const response = await axios.patch(`/products/${productId}/inventory`, {
			size,
			quantity: Number(quantity),
		});

		const updatedProduct = response.data.updatedProduct;

		set((state) => ({
			products: state.products.map((product) =>
				product._id === productId ? updatedProduct : product
			),
		}));

		toast.success("Quantity updated");
	} catch (error) {
		toast.error(error.response?.data?.message || "Failed to update quantity");
	}
},
fetchProductById: async (id) => {
	set({ selectedProduct: null, loading: true });

	try {
		const response = await axios.get(`/products/${id}`);
		set({ selectedProduct: response.data, loading: false });
	} catch (error) {
		set({ selectedProduct: null, loading: false });
		toast.error("Failed to fetch product");
	}
},
}));