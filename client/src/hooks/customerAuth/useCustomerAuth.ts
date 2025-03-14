import { useMutation } from '@tanstack/react-query'
import {
    registerCustomer,
    sendOtp,
    verifyOtp,
    loginCustomer
} from '../../services/customer/authServices'
import { CustomerRegisterData, CustomerLoginData } from '../../types/auth'

export const useCustomerRegister = () => {
    return useMutation({
        mutationFn: (data: CustomerRegisterData) => registerCustomer(data),
        onError: (error: Error) => {
            console.error("Registraton error: ", error);
        }
    })
}

export const useSendOtp = () => {
    return useMutation({
        mutationFn: (email: string) => sendOtp(email),
        onError: (error: Error) => {
            console.error("Error sending otp: ", error)
        }
    })
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: ({ email, otp }: { email: string, otp: string }) => verifyOtp(email, otp),
        onError: (error: Error) => {
            console.error("Verify email error: ", error)
        }
    })
}

export const useCsutomerLogin = () => {
    return useMutation({
        mutationFn: (data: CustomerLoginData) => loginCustomer(data),
        onError: (error: Error) => {
            console.error(error)
        }
    })
}