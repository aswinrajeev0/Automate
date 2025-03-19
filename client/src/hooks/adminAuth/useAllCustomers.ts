import { useQuery } from "@tanstack/react-query";
import { CustomersData } from "../../components/admin/customers/Customers";


interface FetchCustomersParams {
    page: number;
    limit: number;
    search: string;
}

type customersResponse<T> = {
    users: T;
    totalPages: number;
    currentPage: number;
};

export const useAllCustomersQuery = <T extends CustomersData>(
    queryFunc: (params: FetchCustomersParams) => Promise<customersResponse<T>>,
    page: number,
    limit: number,
    search: string
) => {
    return useQuery({
        queryKey: ["customers", page, limit, search],
        queryFn: () => queryFunc({ page, limit, search }),
        placeholderData: (prevData) => prevData ? { ...prevData } : undefined,
    });
};