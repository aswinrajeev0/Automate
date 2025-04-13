import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "../../ui/Card"
import { Tooltip } from "react-leaflet"
import { useState } from "react";
import { useCustomerGrowth } from "../../../hooks/admin/useDashboard";

function DashboardContent() {
    const [filter, setFilter] = useState("monthly");

    const {data: customerGrowthData} = useCustomerGrowth(filter);
    const customerData = (customerGrowthData?.customerData || []) as {name: string; customers: number}[];
    const totalCustomers = customerData.reduce((acc, curr) => acc + curr.customers, 0)

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card className="bg-[#9b87f5] text-white border-none shadow-md">
                    <CardContent className="p-4 md:p-6">
                        <div className="space-y-1">
                            <p className="text-base md:text-lg font-medium">Total Revenue</p>
                            <p className="text-2xl md:text-3xl font-bold">₹525,015</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#9b87f5] text-white border-none shadow-md">
                    <CardContent className="p-4 md:p-6">
                        <div className="space-y-1">
                            <p className="text-base md:text-lg font-medium">Total Requests</p>
                            <p className="text-2xl md:text-3xl font-bold">524</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#9b87f5] text-white border-none shadow-md">
                    <CardContent className="p-4 md:p-6">
                        <div className="space-y-1">
                            <p className="text-base md:text-lg font-medium">No. of Customers</p>
                            <p className="text-2xl md:text-3xl font-bold">{totalCustomers}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#9b87f5] text-white border-none shadow-md">
                    <CardContent className="p-4 md:p-6">
                        <div className="space-y-1">
                            <p className="text-base md:text-lg font-medium">No. of Workshops</p>
                            <p className="text-2xl md:text-3xl font-bold">56</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional content would go here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 md:p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg md:text-xl font-bold">Customer Growth</h2>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="p-2 border rounded-md bg-white text-sm"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                        <div className="h-60 md:h-80 bg-muted/20 rounded-md flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={customerData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="customers" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-4 md:p-6">
                        <h2 className="text-lg md:text-xl font-bold mb-4">Performance Overview</h2>
                        <div className="h-60 md:h-80 bg-muted/20 rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground">Performance metrics would go here</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardContent

