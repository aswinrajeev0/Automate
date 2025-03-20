
import { Card, CardContent } from '../../ui/Card';

function DashboardContent() {
    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-[#9b87f5] text-white border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="space-y-1">
                            <p className="text-lg font-medium">Total Revenue</p>
                            <p className="text-3xl font-bold">₹525,015</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#9b87f5] text-white border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="space-y-1">
                            <p className="text-lg font-medium">Total Requests</p>
                            <p className="text-3xl font-bold">524</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#9b87f5] text-white border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="space-y-1">
                            <p className="text-lg font-medium">No. of Customers</p>
                            <p className="text-3xl font-bold">548</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#9b87f5] text-white border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="space-y-1">
                            <p className="text-lg font-medium">No. of Workshops</p>
                            <p className="text-3xl font-bold">56</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sales Overview Chart */}
            {/* <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
                    <div className="h-80">
                        <ChartContainer
                            config={{
                                revenue: {
                                    label: "Revenue",
                                    theme: {
                                        light: "#9b87f5",
                                        dark: "#9b87f5",
                                    },
                                },
                            }}
                        >
                            <AreaChart
                                data={salesData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
                                                    <p className="font-medium">{`${payload[0].payload.name}: ₹${payload[0].value?.toLocaleString()}`}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#9b87f5"
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card> */}

            {/* User Growth Chart */}
            {/* <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">User Growth</h2>
                    <div className="h-80">
                        <ChartContainer
                            config={{
                                users: {
                                    label: "Users",
                                    theme: {
                                        light: "#9b87f5",
                                        dark: "#9b87f5",
                                    },
                                },
                            }}
                        >
                            <AreaChart
                                data={userGrowthData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
                                                    <p className="font-medium">{`${payload[0].payload.name}: ${payload[0].value} users`}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#9b87f5"
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card> */}
        </div>
    )
}

export default DashboardContent
