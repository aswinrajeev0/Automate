import { Route, Routes } from "react-router-dom";
import WorkshopSignupPage from "../pages/workshop/WorkshopSignup";
import WorkshopLoginPage from "../pages/workshop/WorkshopLogin";
import WorkshopDashboard from "../pages/workshop/WorkshopDashboard";
import { WorkshopProtected } from "../utils/protected/WorkshopProtected";
import WokshopForgotPasswordPage from "../pages/workshop/WorkshopForgetPassword";
import WorkshopResetPasswordPage from "../pages/workshop/WorkshopResetPassword";

export const WorkshopRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<WorkshopProtected><WorkshopDashboard /></WorkshopProtected>} />
            <Route path="/login" element={<WorkshopLoginPage />} />
            <Route path="/signup" element={<WorkshopSignupPage />} />
            <Route path="/forgot-password" element={<WokshopForgotPasswordPage />} />
            <Route path="/reset-password" element={<WorkshopResetPasswordPage />} />
        </Routes>
    )
}