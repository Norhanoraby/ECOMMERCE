import axios from "axios";

const axiosInstance = axios.create({
	baseURL:
		import.meta.env.MODE === "development"
			? "http://localhost:5001/api"
			: "https://ecommerce-production-e82f.up.railway.app/api",

	withCredentials: true,
});

export default axiosInstance;