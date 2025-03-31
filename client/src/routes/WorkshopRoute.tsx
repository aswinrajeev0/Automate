import { Route, Routes } from "react-router-dom";
import WorkshopSignupPage from "../pages/workshop/WorkshopSignup";
import WorkshopLoginPage from "../pages/workshop/WorkshopLogin";
import WorkshopDashboard from "../pages/workshop/WorkshopDashboard";
import { WorkshopProtected } from "../utils/protected/WorkshopProtected";
import WokshopForgotPasswordPage from "../pages/workshop/WorkshopForgetPassword";
import WorkshopResetPasswordPage from "../pages/workshop/WorkshopResetPassword";
import WorkshopDasboardContent from "../components/workshop/DashboardContent";
import ProfileContent from "../components/workshop/profile/ProfileContent";
import RequestsPage from "../pages/workshop/Requests";
import RequestDetailsPage from "../components/workshop/requests/RequestDetails";

export const WorkshopRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<WorkshopProtected><WorkshopDashboard /></WorkshopProtected>}>
                <Route index element={<WorkshopProtected><WorkshopDasboardContent /></WorkshopProtected>} />
                <Route path="requests" element={<RequestsPage />} />
                <Route path="pending-jobs" />
                <Route path="finished-jobs" />
                <Route path="chats" />
                <Route path="ratings" />
                <Route path="profile" element={<ProfileContent />} />
                <Route path="requests/request-details/:requestId" element={<RequestDetailsPage />} />
            </Route>
            <Route path="/login" element={<WorkshopLoginPage />} />
            <Route path="/signup" element={<WorkshopSignupPage />} />
            <Route path="/forgot-password" element={<WokshopForgotPasswordPage />} />
            <Route path="/reset-password" element={<WorkshopResetPasswordPage />} />
        </Routes>
    )
}