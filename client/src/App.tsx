import SignupPage from "./pages/customer/Signup"
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
