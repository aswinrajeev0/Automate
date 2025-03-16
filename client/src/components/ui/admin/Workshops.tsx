import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../Table";
import { Button } from "../Button";
import { debounce } from "lodash";
import { getAllWorkshops } from "../../../services/admin/adminService";
import { useUpdateWorkshopStatusMutation } from "../../../hooks/adminAuth/useUpdateWorkshopStatus";
import { Pagination1 } from "./Pagination1";
import { Search } from "lucide-react";
import { Input } from "../Input";
import { useAllWorkshopsQuery } from "../../../hooks/adminAuth/useAllWorkshops";

export interface IWorkshop {
    _id: string;
    wowrkshopId: string;
    name: string;
    email: string;
    phone: string;
    isBlocked: boolean;
}

export type WorkshopData = {
    users: IWorkshop[];
    totalPages: number;
};

const Workshops: React.FC = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const [currentPage, setCurrentPage] = useState(1);
    const { mutate: updateWorkshopStatus } = useUpdateWorkshopStatusMutation();

    const limit = 10;

    function handleBlockStatus(userId: string) {
        updateWorkshopStatus(userId);
    }

    useEffect(() => {
        const handler = debounce(() => setDebouncedSearch(searchQuery), 300);
        handler();
        return () => handler.cancel();
    }, [searchQuery]);

    const { data, isLoading, isError } = useAllWorkshopsQuery<WorkshopData>(
        getAllWorkshops,
        currentPage,
        limit,
        debouncedSearch,
    );

    const workshops = (data?.workshops ?? []) as IWorkshop[];
    const totalPages = data?.totalPages || 1;

    return (
        <main className="p-6">
            <div className="space-y-6">
                <div className="flex items-center gap-20">
                    <h1 className="text-3xl font-bold text-gray-800">Workshops</h1>
                    <div className="relative flex w-64 items-center">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-black/70" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 bg-black/5 border-black/20 text-black placeholder:text-black/40"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Workshop Table */}
                {isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Loading workshops...</p>
                    </div>
                ) : isError ? (
                    <div className="text-center py-8">
                        <p className="text-red-500">Failed to load workshops.</p>
                    </div>
                ) : workshops.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No workshops found.</p>
                    </div>
                ) : (
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
                                {workshops.map((workshop, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{workshop._id}</TableCell>
                                        <TableCell>{workshop.name}</TableCell>
                                        <TableCell>{workshop.email}</TableCell>
                                        <TableCell>{workshop.phone}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleBlockStatus(workshop._id)}
                                                className={workshop.isBlocked ?
                                                    "bg-green-400 hover:bg-green-500" :
                                                    "bg-red-400 hover:bg-red-500"
                                                }
                                            >
                                                {workshop.isBlocked ? "Unblock" : "Block"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-6 flex justify-center items-center">
                    <Pagination1
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageNext={() => setCurrentPage(currentPage + 1)}
                        onPagePrev={() => setCurrentPage(currentPage - 1)}
                    />
                </div>
            </div>
        </main>
    )
}

export default Workshops