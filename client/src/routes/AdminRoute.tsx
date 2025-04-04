import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProtected from "../utils/protected/AdminProtected";
import DashboardContent from "../components/admin/dashboard/DashboardContent";
import Customers from "../components/admin/customers/Customers";
import Workshops from "../components/admin/workshops/Workshops";
// import ApprovalContent from "../components/ui/admin/ApprovalContent";
import WorkshopApproval from "../components/admin/workshops/WorkshopApproval";

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<AdminLoginPage />} />

            //protected admin routes
            <Route path="/" element={<AdminProtected><AdminDashboard /></AdminProtected>} >
                <Route index element={<DashboardContent />} />
                <Route path="customers" element={<Customers />} />
                <Route path="workshops" element={<Workshops />} />
                <Route path="approvals" element={<WorkshopApproval />} />
                <Route path="requests" />
                <Route path="revenue-report" />
            </Route>

        </Routes>
    )
}