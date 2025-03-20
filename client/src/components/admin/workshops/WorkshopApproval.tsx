
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/Table";
import { Button } from "../../ui/button";
import { Check, Eye, Search, X } from "lucide-react";
import { Badge } from "../../ui/Badge";
import { debounce } from "lodash";
import { useAllWorkshopsQuery } from "../../../hooks/admin/useAllWorkshops";
import { WorkshopData } from "./Workshops";
import { getAllWorkshops } from "../../../services/admin/adminService";
import { useToast } from "../../../hooks/ui/useToast";
import { Pagination1 } from "../Pagination1";
import { Input } from "../../ui/Input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/Dialog";
import { Textarea } from "../../ui/Textarea";
import { useUpdateWorkshopApprovalStatusMutation } from "../../../hooks/admin/useUpdateWorkshopApprovalStatus";
import WorkshopDetails from "./WorkshopDetails";

export interface IWorkshopApproval {
    _id: string;
    workshopId: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    buildingNo: string;
    isBlocked: boolean;
    approvalStatus: string;
    createdAt: Date;
    rejectionReason: string;
}

const WorkshopApproval: React.FC = () => {
    const { toast } = useToast();
    const [filter, setFilter] = useState("all");
    const [viewDetails, setViewDetails] = useState<IWorkshopApproval | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const limit = 10;
    const { mutate: updateWorkshopApprovalStatus } = useUpdateWorkshopApprovalStatusMutation();

    async function updateApprovalStatus(workshopId: string, status: string, reason?: string) {
        await updateWorkshopApprovalStatus({ workshopId, status, reason })
        toast({
            title: `Workshop ${status}`,
            description: status === "rejected"
                ? `Workshop has been rejected${reason ? ` with reason: ${reason}` : ''}.`
                : "Workshop has been approved.",
        });

        setRejectDialogOpen(false);
        setRejectionReason("");
        setSelectedWorkshopId(null);
    }

    function handleRejectClick(workshopId: string) {
        setSelectedWorkshopId(workshopId);
        setRejectDialogOpen(true);
    }

    function handleConfirmReject() {
        if (selectedWorkshopId) {
            updateApprovalStatus(selectedWorkshopId, "rejected", rejectionReason);
        }
    }

    function handleViewDetails(workshop: IWorkshopApproval) {
        setViewDetails(workshop);
        setDetailsOpen(true);
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
        debouncedSearch
    );

    const allWorkshops = (data?.workshops ?? []) as IWorkshopApproval[];

    const workshops = allWorkshops.filter(workshop =>
        workshop.approvalStatus === "pending" || workshop.approvalStatus === "rejected"
    );

    const totalPages = data?.totalPages || 1;

    return (
        <div className="flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Workshop Registration Requests</h1>
                    <p className="text-muted-foreground">
                        Review and manage workshop registration applications
                    </p>
                </div>
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

            <div className="flex gap-2 mb-6">
                <Button
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                >
                    All
                </Button>
                <Button
                    variant={filter === "pending" ? "default" : "outline"}
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </Button>
                <Button
                    variant={filter === "rejected" ? "default" : "outline"}
                    onClick={() => setFilter("rejected")}
                >
                    Rejected
                </Button>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">Loading workshops...</p>
                </div>
            ) : isError ? (
                <div className="text-center py-8">
                    <p className="text-red-400">Failed to load workshops.</p>
                </div>
            ) : workshops.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No pending or rejected workshops found.</p>
                </div>
            ) : (<div className="rounded-md border overflow-hidden">
                <div>
                    <Table className="">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Workshop</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Applied Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {workshops.map((workshop) => (
                                <TableRow key={workshop.workshopId}>
                                    <TableCell className="font-medium">#{workshop.workshopId}</TableCell>
                                    <TableCell>{workshop.name}</TableCell>
                                    <TableCell>
                                        {workshop.email}
                                    </TableCell>
                                    <TableCell>{new Date(workshop.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className=""
                                            variant={
                                                workshop.approvalStatus === "pending"
                                                    ? "secondary"
                                                    : workshop.approvalStatus === "rejected"
                                                        ? "destructive"
                                                        : "default"
                                            }
                                        >
                                            {workshop.approvalStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewDetails(workshop)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            {workshop.approvalStatus === "pending" && (
                                                <>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => updateApprovalStatus(workshop._id, "approved")}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleRejectClick(workshop._id)}
                                                    >
                                                        <X className="h-4 w-4 text-white" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            )}
            <div className="mt-6 flex justify-center items-center">
                <Pagination1
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageNext={() => setCurrentPage(currentPage + 1)}
                    onPagePrev={() => setCurrentPage(currentPage - 1)}
                />
            </div>

            {/* Rejection Reason Dialog */}
            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Reject Workshop</DialogTitle>
                        <DialogDescription>
                            Please provide a reason for rejecting this workshop. This will be shared with the applicant.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Textarea
                            id="rejection-reason"
                            placeholder="Enter rejection reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmReject}>
                            Reject Workshop
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Workshop Details Dialog */}
            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="sm:max-w-lg max-h-[100vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Workshop Details</DialogTitle>
                        <DialogDescription>Complete information about the workshop registration.</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4 flex-1 overflow-y-auto max-h-[60vh] px-2">
                        {viewDetails && (
                            <WorkshopDetails viewDetails={viewDetails} />
                        )}
                    </div>
                    <div className="mt-8 flex justify-end">
                        <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    );
}

export default WorkshopApproval;