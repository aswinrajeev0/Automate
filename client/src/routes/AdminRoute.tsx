import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProtected from "../utils/protected/AdminProtected";
import DashboardContent from "../components/ui/admin/DashboardContent";
import Customers from "../components/ui/admin/Customers";
import Workshops from "../components/ui/admin/Workshops";
import ApprovalContent from "../components/ui/admin/ApprovalContent";

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<AdminLoginPage />} />

            //protected admin routes
            <Route path="/" element={<AdminProtected><AdminDashboard /></AdminProtected>} >
                <Route index element={<DashboardContent />} />
                <Route path="customers" element={<Customers />} />
                <Route path="workshops" element={<Workshops />} />
                <Route path="approvals" element={<ApprovalContent />} />
            </Route>

        </Routes>
    )
}