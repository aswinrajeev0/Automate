import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/login" element={<AdminLoginPage />} />
        </Routes>
    )
}