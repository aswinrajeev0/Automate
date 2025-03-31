"use client"

import { useState, useEffect } from "react"
// import Image from "next/image"
import { Input } from "../../components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useMediaQuery } from "../../hooks/use-media-query"
import { Card, CardContent } from "../../components/ui/Card"
import { Star, MapPin, AlertCircle, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "../../components/customer/Header"
import { Footer } from "../../components/customer/Footer"
import { Workshop } from "../../types/workshop.type"
import { useAllWorkshopsQuery } from "../../hooks/admin/useAllWorkshops"
import { useWorkshopsQuery } from "../../hooks/customer/useWorkshops"
import { getAllWorkshops } from "../../services/customer/workshopServices"

// Status filter type
type StatusFilterType = "all" | "approved" | "pending" | "rejected"

const WorkshopsPage = () => {
    // Sample data - this would normally be fetched from an API
    const [workshops, setWorkshops] = useState<Workshop[]>([
        {
            _id: "67d6993d567b65cdfee823b0",
            workshopId: "amt-workshop-38f-4133-8eb0-b7030cd7cc8f",
            name: "Adonz Automotive",
            email: "adonz@gmail.com",
            city: "Cochin",
            state: "Kerala",
            country: "India",
            streetAddress: "Maradu",
            approvalStatus: "approved",
            isActive: false,
            isBlocked: false,
            bio: "At Adonz Auto Care, we provide top-quality automotive repair and maintenance...",
            image: "https://res.cloudinary.com/duxbbxnus/image/upload/v1743065890/qby9hdog…",
        },
        {
            _id: "67da78a37a3916d015111307",
            workshopId: "amt-workshop-be9-422a-8e53-7f61fff60775",
            name: "Sample Workshop",
            email: "workshop@gmail.com",
            city: "Cochin",
            state: "Kerala",
            country: "India",
            streetAddress: "Maradu",
            approvalStatus: "approved",
            isActive: false,
            isBlocked: false,
            image: null,
        },
        {
            _id: "67dcf4dce6e3641df0f6c167",
            workshopId: "amt-workshop-cf0-460f-816e-dbd4898fd72e",
            name: "Wshop",
            email: "geyebad356@barodis.com",
            city: "Cochin",
            state: "Kerala",
            country: "India",
            streetAddress: "Maradu",
            approvalStatus: "rejected",
            isActive: false,
            isBlocked: false,
            rejectionReason: "Not enough details",
            image: null,
        },
        {
            _id: "67e2357757ba255b45c2d1bb",
            workshopId: "amt-workshop-b18-47e3-9b2a-56c0aaff8b9b",
            name: "workshop sample",
            email: "asw@gmail.com",
            city: "Cochin",
            state: "Kerala",
            country: "India",
            streetAddress: "Maradu",
            approvalStatus: "approved",
            isActive: false,
            isBlocked: false,
            image: null,
        },
    ])

    
    const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all")
    const [locationFilter, setLocationFilter] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const workshopsPerPage: number = 8
    
    const {data} = useWorkshopsQuery(currentPage, 8, searchQuery )
    const workshops1 = data?.workshops

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            try {
                let results = [...workshops]

                if (searchQuery) {
                    results = results.filter(
                        (workshop) =>
                            workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            workshop.city.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                }

                if (statusFilter !== "all") {
                    results = results.filter((workshop) => workshop.approvalStatus === statusFilter)
                }

                if (locationFilter !== "all") {
                    results = results.filter((workshop) => workshop.city === locationFilter)
                }

                setFilteredWorkshops(results)
                setIsLoading(false)
            } catch (error) {
                console.error("Error filtering workshops:", error)
                setIsError(true)
                setIsLoading(false)
            }
        }, 300)
    }, [searchQuery, statusFilter, locationFilter, workshops])

    const locations = [...new Set(workshops.map((workshop) => workshop.city))]

    const indexOfLastWorkshop = currentPage * workshopsPerPage
    const indexOfFirstWorkshop = indexOfLastWorkshop - workshopsPerPage
    const currentWorkshops = filteredWorkshops.slice(indexOfFirstWorkshop, indexOfLastWorkshop)

    const totalPages = Math.ceil(filteredWorkshops.length / workshopsPerPage)

    const placeholderImages = ["/api/placeholder/400/300", "/api/placeholder/400/300"]

    if (isLoading) {
        return (
            <div className="bg-white p-4 md:p-6 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-yellow-500 animate-spin mb-4"></div>
                <p className="text-gray-700 font-medium">Loading workshops...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="bg-white p-4 md:p-6 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
                <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded mb-4 max-w-md">
                    <h3 className="text-red-700 font-medium mb-2">Unable to load workshops</h3>
                    <p className="text-red-600">There was an error while fetching the workshops. Please try again later.</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <>
        <Header />
            <div className="bg-gray-50 min-h-[calc(100vh-200px)]">
                <div className="container mx-auto px-4 py-6">
                    {/* Page Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <a href="/" className="text-gray-600 hover:text-yellow-500">
                                Home
                            </a>
                            <span className="text-gray-400">/</span>
                            <span className="text-yellow-500 font-medium">Workshops</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Find Auto Workshops</h1>
                        <p className="text-gray-600 mt-1">Discover and connect with top-rated automotive workshops</p>
                    </div>

                    {/* Search & Filter Section */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    type="search"
                                    placeholder="Search workshops by name or location..."
                                    className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-3">
                                <div className="w-full md:w-40">
                                    <Select value={statusFilter} onValueChange={(value: StatusFilterType) => setStatusFilter(value)}>
                                        <SelectTrigger className="bg-gray-50 border-gray-200">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="w-full md:w-48">
                                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                                        <SelectTrigger className="bg-gray-50 border-gray-200">
                                            <SelectValue placeholder="Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Locations</SelectItem>
                                            {locations.map((location) => (
                                                <SelectItem key={location} value={location}>
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-600">
                            Showing <span className="font-medium">{filteredWorkshops.length}</span> workshops
                        </p>
                        {filteredWorkshops.length > 0 && (
                            <div className="flex items-center gap-1">
                                <Filter size={16} className="text-gray-500" />
                                <span className="text-sm text-gray-500">
                                    Filtered by: {statusFilter !== "all" ? statusFilter : ""}
                                    {statusFilter !== "all" && locationFilter !== "all" ? ", " : ""}
                                    {locationFilter !== "all" ? locationFilter : ""}
                                    {statusFilter === "all" && locationFilter === "all" ? "None" : ""}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Workshops Grid */}
                    {filteredWorkshops.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle size={24} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">No workshops found</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                {searchQuery || statusFilter !== "all" || locationFilter !== "all"
                                    ? "No results match your search criteria. Try adjusting your filters."
                                    : "There are no workshops available at the moment."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {currentWorkshops.map((workshop, index) => (
                                <Card key={workshop._id} className="overflow-hidden hover:shadow-md transition-shadow group">
                                    <div className="relative h-44">
                                        {/* <Image
                    src={placeholderImages[index % 2] || "/placeholder.svg"}
                    alt={workshop.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  /> */}
                  
                                        {workshop.approvalStatus === "rejected" && (
                                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                Rejected
                                            </div>
                                        )}
                                        <button
                                            className="absolute top-2 left-2 bg-white/80 hover:bg-white p-1.5 rounded-full transition-colors"
                                            aria-label="Add to favorites"
                                        >
                                            <Star size={16} className="text-gray-400 hover:text-yellow-500" />
                                        </button>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate">{workshop.name}</h3>
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <MapPin size={14} className="mr-1" />
                                            <span className="truncate">
                                                {workshop.streetAddress}, {workshop.city}
                                            </span>
                                        </div>
                                        {workshop.bio ? (
                                            <p className="text-sm text-gray-600 line-clamp-2">{workshop.bio}</p>
                                        ) : (
                                            <p className="text-sm text-gray-400 italic">No description available</p>
                                        )}
                                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                            <span className="text-sm text-gray-500">{workshop.country}</span>
                                            <a
                                                href={`/workshops/${workshop.workshopId}`}
                                                className="text-sm font-medium text-yellow-600 hover:text-yellow-700"
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredWorkshops.length > 0 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50"} border border-gray-200`}
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const pageNumber = i + 1
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === pageNumber ? "bg-yellow-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                            } border border-gray-200`}
                                        aria-label={`Page ${pageNumber}`}
                                        aria-current={currentPage === pageNumber ? "page" : undefined}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            })}

                            {totalPages > 5 && <span className="px-2 text-gray-500">...</span>}

                            {totalPages > 5 && (
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === totalPages ? "bg-yellow-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                        } border border-gray-200`}
                                    aria-label={`Page ${totalPages}`}
                                    aria-current={currentPage === totalPages ? "page" : undefined}
                                >
                                    {totalPages}
                                </button>
                            )}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-md ${currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50"} border border-gray-200`}
                                aria-label="Next page"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default WorkshopsPage

