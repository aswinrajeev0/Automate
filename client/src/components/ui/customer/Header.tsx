import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../store/store"
import { Power } from 'lucide-react';
import { customerLogout } from "../../../store/slices/customerSlice";
import { useToaster } from "../../../hooks/ui/useToaster";

export const Header = () => {

    const navigate = useNavigate()
    const { customer } = useSelector((state: RootState) => state.customer)
    const dispatch = useDispatch()
    const {successToast} = useToaster()

    function handleLogout(){
        dispatch(customerLogout())
        successToast("Logged out successfully.")
        navigate('/login')
    }

    return (
        <header className="bg-amber-300 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-black rounded-full p-3 mr-3">
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
                    <h1 className="text-xl font-semibold uppercase tracking-wider">Automate</h1>
                </div>
                <div className="flex gap-4">
                    {customer ? <Power onClick={handleLogout} /> :
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="text-black-400 px-4 py-2 rounded-md hover:text-black/50 transition-colors"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="text-black-400 px-4 py-2 rounded-md hover:text-black/50 transition-colors"
                            >
                                Sign Up
                            </button>
                        </>
                    }
                </div>
            </div>
        </header>
    )
}