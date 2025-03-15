import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Table";
import { Button } from "../Button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../Pagination";
import { debounce } from "lodash";
import { useAllCustomersQuery } from "../../../hooks/adminAuth/useAllCustomers";
import { getAllCustomers } from "../../../services/admin/adminService";
import { useUpdateCustomerStatusMutation } from "../../../hooks/adminAuth/useUpdateCustomerStatus";

export interface ICustomer {
    _id: string;
    clientId: string;
    name: string;
    email: string;
    phone: string;
    isBlocked: boolean;
}

export type CustomersData = {
    users: ICustomer[];
    totalPages: number;
};

const Customers: React.FC = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const [currentPage, setCurrentPage] = useState(1);
    const { mutate: updateCustomerStatus } = useUpdateCustomerStatusMutation();

    const limit = 10;

    function handleBlockStatus(userId: string) {
        updateCustomerStatus(userId);
    }

    useEffect(() => {
        const handler = debounce(() => setDebouncedSearch(searchQuery), 300);
        handler();
        return () => handler.cancel();
    }, [searchQuery]);

    const { data, isLoading, isError } = useAllCustomersQuery<CustomersData>(
        getAllCustomers,
        currentPage,
        limit,
        debouncedSearch,
    );

    const customers = (data?.users ?? []) as ICustomer[];
    const totalPages = data?.totalPages || 1;

    return (
        <main className="p-6">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Users</h1>

                {/* Customer Table */}
                <div className="bg-white rounded-md shadow overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="font-bold">Id</TableHead>
                                <TableHead className="font-bold">Name</TableHead>
                                <TableHead className="font-bold">Email</TableHead>
                                <TableHead className="font-bold">Phone</TableHead>
                                <TableHead className="font-bold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer, index) => (
                                <TableRow key={index}>
                                    <TableCell>{customer._id}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleBlockStatus(customer._id)}
                                            className={customer.isBlocked ?
                                                "bg-green-400 hover:bg-green-500" :
                                                "bg-red-400 hover:bg-red-500"
                                            }
                                        >
                                            {customer.isBlocked ? "Unblock" : "Block"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">...</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">10</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </main>
    )
}

export default Customers