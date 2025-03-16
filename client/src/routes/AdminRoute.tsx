import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProtected from "../utils/protected/AdminProtected";

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<AdminLoginPage />} />

            //protected admin routes
            <Route path="/" element={<AdminProtected><AdminDashboard /></AdminProtected>} />

        </Routes>
    )
}