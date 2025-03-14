import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/customer/Signup";
import LoginPage from "../pages/customer/Login";
import LandingPage from "../pages/customer/LandingPage";
import ForgotPasswordPage from "../pages/customer/ForgetPassword";

export const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
    )
}