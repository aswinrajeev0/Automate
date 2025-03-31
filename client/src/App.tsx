import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomerRoutes } from "./routes/CustomerRoute";
import { AdminRoutes } from "./routes/AdminRoute";
import { WorkshopRoutes } from "./routes/WorkshopRoute";
import WorkshopsPage from "./pages/customer/AllWorkshops";
function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/workshop/*" element={<WorkshopRoutes />} />
        <Route path="/test" element={<WorkshopsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
