import { Route, Routes } from "react-router-dom";
import SignupPage from "../pages/customer/Signup";
import LoginPage from "../pages/customer/Login";
import LandingPage from "../pages/customer/LandingPage";
import ForgotPasswordPage from "../pages/customer/ForgetPassword";
import ResetPasswordPage from "../pages/customer/ResetPassword";
import UserProfile from "../pages/customer/UserProfile";
import Map from "../components/map/Map";
import WorkshopDetail from "../pages/customer/WorkshopDetails";
import ServicesPage from "../pages/customer/RequestService";
import ServiceSelectionPage from "../pages/customer/SeriviceSelection";
import SlotBookingPage from "../pages/customer/SlotBookingPage";
import CarLiftServiceForm from "../pages/customer/CarLiftRequestPage";
import MobileWorkshop from "../pages/customer/MobileWorkshop";
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
            <Route path="/request-service/:workshopId" element={<ServicesPage />} />
            <Route path="/request-service/service/:workshopId" element={<ServiceSelectionPage />} />
            <Route path="/request-service/slot-booking/:workshopId" element={<SlotBookingPage />} />
            <Route path="/request-service/car-lift/:workshopId" element={<CarLiftServiceForm />} />
            <Route path="/request-service/mobile-workshop/:workshopId" element={<MobileWorkshop />} />
        </Routes>
    )
}