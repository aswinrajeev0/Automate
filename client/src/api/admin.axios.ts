import axios from "axios";
import { store } from "../store/store";
import { adminLogout } from "../store/slices/adminSlice";
import toast from "react-hot-toast";

export const adminApi = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_URL,
    withCredentials: true
})

let isRefreshing = false;

adminApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
        
        if (originalRequest.url === "/admin/login") {
            return Promise.reject(error);
        }

		if (
			error.response?.status === 401 &&
			error.response.data.message === "Token Expired" &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			if (!isRefreshing) {
				isRefreshing = true;
				try {
					await adminApi.post("/admin/refresh-token");
					isRefreshing = false;
					return adminApi(originalRequest);
				} catch (refreshError) {
					isRefreshing = false;

					store.dispatch(adminLogout());

					window.location.href = "/admin";
					toast("Please login again");
					return Promise.reject(refreshError);
				}
			}
		}
		if (
			(error.response.status === 401 &&
				error.response.data.message === "Invalid token") ||
			(error.response.status === 403 &&
				error.response.data.message === "Token is blacklisted") ||
			(error.response.status === 403 &&
				error.response.data.message ===
					"Access denied: Your account has been blocked" &&
				!originalRequest._retry)
		) {
			console.log("Session ended");
			store.dispatch(adminLogout());

			window.location.href = "/admin";
			toast("Please login again");
			return Promise.reject(error);
		}

		return Promise.reject(error);
	}
);