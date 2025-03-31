import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllWorkshops, submitReview, workshopDetails } from "../../services/customer/workshopServices";

export interface IWorkshop {
    id: string;
    workshopId: string;
    name: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    image?: string;
    bio?: string
}

export type WorkshopData = {
    workshops: IWorkshop[];
};

type workshopsResponse<T> = {
    workshops: T;
};

export type WorkshopDetailsResponse = {
    workshop: IWorkshop;
    reviews: IReview[];
};

export interface IReview {
    reviewId: string;
    workshopId: string;
    userId: {
        image?: string; _id?: string; name?: string
    };
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IReveiwSubmitData {
    rating: number,
    comment: string,
    workshopId: string
}

export const useWorkshopsQuery = <T extends WorkshopData>(
    page: number,
    limit: number,
    searchQuery: string
) => {
    return useQuery({
        queryKey: ["workshops"],
        queryFn: () => getAllWorkshops(page, limit, searchQuery),
        placeholderData: (prevData) => prevData ? { ...prevData } : undefined,
    });
};

export const useWorkshopDetails = (id: string) => {
    return useQuery<WorkshopDetailsResponse, Error>({
        queryKey: ["workshop-details", id],
        queryFn: ({ queryKey }) => workshopDetails(queryKey[1] as string)
    })
}

export const useSubmitReview = () => {
    return useMutation({
        mutationFn: (data: IReveiwSubmitData) => submitReview(data),
        onError: (error: Error) => {
            console.error("Error submiting review", error)
        }
    })
}