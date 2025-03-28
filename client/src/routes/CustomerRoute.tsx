import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/customer/Signup";
import LoginPage from "../pages/customer/Login";
import LandingPage from "../pages/customer/LandingPage";
import ForgotPasswordPage from "../pages/customer/ForgetPassword";
import ResetPasswordPage from "../pages/customer/ResetPassword";
import UserProfile from "../pages/customer/UserProfile";
import Map from "../components/map/Map";
import WorkshopDetail from "../pages/customer/WorkshopDetails";
// import AllWorkshops from "../pages/customer/AllWorkshops";

export const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/map" element={<Map />} />
            {/* <Route path="/workshops" element={<AllWorkshops />} /> */}
            <Route path="/workshop-details/:id" element={<WorkshopDetail />} />
        </Routes>
    )
}