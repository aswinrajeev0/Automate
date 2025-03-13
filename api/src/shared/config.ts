import dotenv from 'dotenv';

dotenv.config()

export const config = {
    cors: {
        ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173"
    },
    database: {
        URI: process.env.DATABASE_URI || ""
    },
    server: {
        PORT: process.env.PORT || 5000,
        NODE_ENV: process.env.NODE_ENV || 'dev'
    },
    nodemailer: {
        EMAIL_USER: process.env.SMTP_EMAIL,
        EMAIL_PASS: process.env.SMTP_PASS,
    },
    OtpExpiry: process.env.OTP_EXPIRY_IN_MINUTES || "2",
    loggerStatus: process.env.LOGGER_STATUS || "dev",
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10)
}