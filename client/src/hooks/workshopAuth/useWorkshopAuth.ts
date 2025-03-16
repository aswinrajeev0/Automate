import { useMutation } from '@tanstack/react-query'
import {
    registerWorkshop,
    sendOtp,
    verifyOtp,
    workshopLogin
} from '../../services/workshop/authService'
import { WorkshopRegisterData, WorkshopLoginData } from '../../types/auth'

export const useWorkshopRegister = () => {
    return useMutation({
        mutationFn: (data: WorkshopRegisterData) => registerWorkshop(data),
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

export const useWorkshopLogin = () => {
    return useMutation({
        mutationFn: (data: WorkshopLoginData) => workshopLogin(data),
        onError: (error: Error) => {
            console.error(error)
        }
    })
}