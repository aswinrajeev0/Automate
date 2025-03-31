"use client"

import { useCallback, useEffect, useState } from "react"
import RequestsTable from "../../components/workshop/requests/RequestsTable"
import RequestsCards from "../../components/workshop/requests/RequestsCards"
import { Pagination1 } from "../../components/admin/Pagination1"
import { debounce } from "lodash"
import { useAllPendingRequests } from "../../hooks/workshop/useWorkshopRequests"
import type { IAllPendingRequests } from "../../types/requests"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useMediaQuery } from "../../hooks/use-media-query"

const RequestsPage = () => {
    const [activeTab, setActiveTab] = useState("requests")
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
    const [currentPage, setCurrentPage] = useState(1)

    const isDesktop = useMediaQuery("(min-width: 768px)")
    const limit = 10

    const debounceSearch = useCallback(
        debounce((query) => setDebouncedSearch(query), 300),
        [],
    )

    useEffect(() => {
        debounceSearch(searchQuery)
        return () => debounceSearch.cancel()
    }, [searchQuery, debounceSearch])

    const { data, isLoading, isError } = useAllPendingRequests(currentPage, limit, debouncedSearch)
    const requests = (data?.requests ?? []) as IAllPendingRequests[]
    const totalPages = data?.totalPages || 1

    if (isLoading) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm h-[calc(100vh-80px)] flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-red-600 animate-spin mb-4"></div>
                <p className="text-gray-700 font-medium">Loading requests...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm h-[calc(100vh-80px)] flex flex-col items-center justify-center">
                <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded mb-4 max-w-md">
                    <h3 className="text-red-700 font-medium mb-2">Unable to load requests</h3>
                    <p className="text-red-600">There was an error while fetching your requests. Please try again later.</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm h-[calc(100vh-80px)] flex flex-col overflow-hidden">
                <div className="mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Service Management</h1>
                    <p className="text-sm text-gray-600">Manage your service requests and bookings</p>
                </div>

                <div className="flex border-b border-gray-200 mb-4">
                    <button
                        className={`py-2 px-4 md:py-3 md:px-6 font-medium text-sm focus:outline-none ${activeTab === "requests" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"
                            }`}
                        onClick={() => setActiveTab("requests")}
                    >
                        Requests
                    </button>
                </div>

                {requests.length === 0 ? (
                    <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm h-[calc(100vh-80px)] flex flex-col items-center justify-center">

                        <p className="text-gray-700 font-medium">No pending requests</p>
                    </div>
                ) : (
                    <>
                        {/* Search & Filter */}
                        <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                            <div className="relative flex-grow max-w-full md:max-w-md">
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="pl-8 bg-black/5 border-black/20 text-black placeholder:text-black/40 h-9"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <Select>
                                <SelectTrigger className="w-[140px] md:w-[180px] h-9">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="car-lifts">Car Lifts</SelectItem>
                                    <SelectItem value="mobile-workshop">Mobile Workshop</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* <button className="flex items-center gap-2 bg-white py-1 px-3 md:py-2 md:px-4 border border-gray-300 rounded-lg hover:bg-gray-50 h-9">
                        <Calendar size={16} />
                        <span className="hidden sm:inline">Date Filter</span>
                    </button> */}
                        </div>

                        {/* Table or Cards based on screen size */}
                        <div className="flex-grow overflow-auto mb-4">
                            {isDesktop ? <RequestsTable requests={requests} /> : <RequestsCards requests={requests} />}
                        </div>

                        {/* Pagination */}
                        <div className="mt-auto pt-2">
                            <Pagination1
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageNext={() => setCurrentPage(currentPage + 1)}
                                onPagePrev={() => setCurrentPage(currentPage - 1)}
                            />
                        </div>
                    </>
                )}


            </div>
        </>
    )
}

export default RequestsPage

