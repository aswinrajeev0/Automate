
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Mail, ArrowLeft } from "lucide-react";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../hooks/ui/useToast";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);
      
      // Mock password reset for now
      console.log("Password reset request submitted for:", values.email);
      
      toast({
        title: "Email Sent",
        description: "Check your inbox for password reset instructions",
      });
      
      // Navigate back to login after successful submission
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset instructions",
        variant: "destructive",
      });
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with illustration - 1/2 of the page */}
      <div className="hidden md:flex md:w-1/2 bg-blend-color items-center justify-center p-8">
        <img
          src="./mechs2.jpg"
          alt="Auto mechanics working on a car"
          className="object-contain w-full max-w-lg h-full"
        />
      </div>

      {/* Right side with form - 1/2 of the page */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-black rounded-full p-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-400"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold uppercase tracking-wider">Automate</h2>
            <div className="mt-2">
              <Link to="/" className="text-amber-600 hover:text-amber-800 text-sm">
                View our landing page
              </Link>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Link to="/login" className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to login</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-600 mb-8">Enter your email and we'll send an OTP to reset your password</p>

          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({  }) => (
              <Form className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 pl-10 rounded-md border border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-black text-amber-400 font-semibold rounded-md hover:bg-gray-900 transition-colors mt-6"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
