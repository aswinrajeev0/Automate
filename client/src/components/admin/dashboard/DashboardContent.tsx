import { Card, CardContent } from "../../ui/Card"

function DashboardContent() {
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
                            <p className="text-2xl md:text-3xl font-bold">548</p>
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
                        <h2 className="text-lg md:text-xl font-bold mb-4">Recent Activity</h2>
                        <div className="h-60 md:h-80 bg-muted/20 rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground">Chart or activity feed would go here</p>
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

