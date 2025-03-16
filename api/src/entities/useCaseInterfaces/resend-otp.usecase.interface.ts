
export interface ICustomerResetPasswordOtpUseCase {
    execute(email: string): Promise<void>
}