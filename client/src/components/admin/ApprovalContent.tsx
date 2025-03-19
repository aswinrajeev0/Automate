import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Table } from "lucide-react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import { Progress } from "@radix-ui/react-progress";
import { Button } from "../ui/Button";

// Sample pending approvals data
const pendingApprovals = [
    { id: 1, customer: "Emma Davis", type: "Workshop Request", date: "May 10, 2023", status: 75 },
    { id: 2, customer: "James Wilson", type: "New Registration", date: "May 9, 2023", status: 30 },
    { id: 3, customer: "Olivia Johnson", type: "Workshop Approval", date: "May 8, 2023", status: 90 },
    { id: 4, customer: "William Brown", type: "Customer Request", date: "May 7, 2023", status: 50 },
  ];

const ApprovalContent: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* <h2 className="text-2xl font-bold">Pending Approvals</h2>
            <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingApprovals.map((approval) => (
                                <TableRow key={approval.id}>
                                    <TableCell className="font-medium">{approval.customer}</TableCell>
                                    <TableCell>{approval.type}</TableCell>
                                    <TableCell>{approval.date}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Progress value={approval.status} className="h-2" />
                                            <span className="text-sm text-gray-500">{approval.status}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button size="sm" className="bg-[#9b87f5] hover:bg-[#8573d4]">
                                                Approve
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                Reject
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card> */}
        </div>
    )
}

export default ApprovalContent