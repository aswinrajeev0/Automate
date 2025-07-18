import { AxiosError } from "axios";
import { adminApi } from "../../api/admin.axios"

export const getReportRequests = async ({ startDate, endDate, page, limit }: { startDate: Date; endDate: Date; page: number; limit: number }) => {
    try {
        const response = await adminApi.get("/get-report-requests", {
            params: {
                startDate,
                endDate,
                page,
                limit
            }
        })

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch reports!");
        }
    }
}

export const revenueReportPageData = async () => {
    try {
        const response = await adminApi.get("/report-page-data")

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch report data");
        }
    }
}

export const getReportBookings = async ({ startDate, endDate, page, limit }: { startDate: Date; endDate: Date; page: number; limit: number }) => {
    try {
        const response = await adminApi.get("/get-report-bookings", {
            params: {
                startDate,
                endDate,
                page,
                limit
            }
        })

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to fetch report bookings!");
        }
    }
}

export const pdfDownload = async ({ startDate, endDate, serviceType }: { startDate: Date; endDate: Date; serviceType: string }) => {
    try {
        const response = await adminApi.get("/report-download", {
            params: {
                startDate,
                endDate,
                serviceType
            },
            responseType: "blob"
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "revenue-report.pdf";
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.data) {
            throw axiosError.response.data;
        } else {
            throw new Error("Failed to download pdf!");
        }
    }
}