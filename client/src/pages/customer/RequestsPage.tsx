import React, { useState } from 'react';
import { Search, Calendar, Filter, ArrowUpDown, Check, Truck, Wrench, Clock } from 'lucide-react';
import { Header } from '../../components/customer/Header';
import { Footer } from '../../components/customer/Footer';
import { useGetAllRequests } from '../../hooks/customer/useServiceRequests';
import { IUserRequestResponse } from '../../types/requests';

// Define TypeScript interfaces
interface ServiceRequest {
    id: string;
    date: string;
    workshop: string;
    type: string;
    amount: string;
    status: 'Ready to pickup' | 'Delivered' | 'In Progress' | 'Pending';
}

const ServiceRequestDashboard = () => {
    // Sample data based on the image
    const [requests, setRequests] = useState<ServiceRequest[]>([
        { id: '1', date: '12/02/2025', workshop: 'Adonz Automotive', type: 'Minor Service', amount: '₹1180', status: 'Ready to pickup' },
        { id: '2', date: '12/02/2025', workshop: 'Adonz Automotive', type: 'Car Lift', amount: '₹1180', status: 'Delivered' },
        { id: '3', date: '12/02/2025', workshop: 'Adonz Automotive', type: 'Mobile Workshop', amount: '₹2500', status: 'Delivered' },
        { id: '4', date: '12/02/2025', workshop: 'Adonz Automotive', type: 'Oil Change', amount: '₹1180', status: 'Delivered' },
        { id: '5', date: '12/02/2025', workshop: 'Adonz Automotive', type: 'Mobile Workshop', amount: '₹1180', status: 'Delivered' },
        { id: '6', date: '12/02/2025', workshop: 'Adonz Automotive', type: 'Mobile Workshop', amount: '₹1180', status: 'Delivered' },
        { id: '7', date: '12/02/2025', workshop: 'Adonz Automotive', type: 'Oil Change', amount: '₹1180', status: 'Delivered' },
        { id: '8', date: '12/02/2025', workshop: 'Adonz Automotive', type: 'Car Lift', amount: '₹1180', status: 'Delivered' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const requestsPerPage = 5;

    const limit = 10;

    const {data, isLoading, isError} = useGetAllRequests(currentPage, limit);

    const requests1 = (data?.requests || []) as IUserRequestResponse[];

    console.log(requests1)

    // Filter and pagination logic
    const filteredRequests = requests1.filter(request =>
        request.type.toLowerCase().includes(filter.toLowerCase()) ||
        request.workshop.name.toLowerCase().includes(filter.toLowerCase()) ||
        request.status.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
    const pageCount = Math.ceil(filteredRequests.length / requestsPerPage);

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ready to pickup': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Pending': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Get service icon
    const getServiceIcon = (type: string) => {
        if (type.includes('Oil Change')) return <Wrench className="h-6 w-6 text-gray-500" />;
        if (type.includes('Car Lift')) return <Truck className="h-6 w-6 text-gray-500" />;
        if (type.includes('Mobile Workshop')) return <Wrench className="h-6 w-6 text-gray-500" />;
        if (type.includes('Minor Service')) return <Wrench className="h-6 w-6 text-gray-500" />;
        return <Wrench className="h-6 w-6 text-gray-500" />;
    };

    return (
        <>
        <Header />
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Service Requests</h1>

                    {/* Filters and search */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by type, workshop or status..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
                                <Calendar className="h-5 w-5 text-gray-500" />
                                <span>Date</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
                                <Filter className="h-5 w-5 text-gray-500" />
                                <span>Filter</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
                                <ArrowUpDown className="h-5 w-5 text-gray-500" />
                                <span>Sort</span>
                            </button>
                        </div>
                    </div>

                    {/* Request cards */}
                    <div className="space-y-4">
                        {currentRequests.map((request) => (
                            <div key={request.requestId} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
                                <div className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <div className="p-3 bg-gray-100 rounded-full mr-4">
                                            {getServiceIcon(request.type)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{request.type}</h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <span className="mr-3">{request.workshop.name}</span>
                                                <span className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {new Date(request.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                                        <div className="text-right">
                                            <div className="font-semibold text-lg">₹{(request.amount || 0).toLocaleString()}</div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                                                {request.status === 'Ready to pickup' && <Clock className="h-3 w-3 inline mr-1" />}
                                                {request.status === 'Delivered' && <Check className="h-3 w-3 inline mr-1" />}
                                                {request.status}
                                            </span>
                                        </div>

                                        <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <div className="flex justify-center mt-6">
                            <nav className="flex items-center gap-1">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    Prev
                                </button>

                                {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                {pageCount > 5 && <span className="px-2">...</span>}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                                    disabled={currentPage === pageCount}
                                    className={`px-3 py-1 rounded ${currentPage === pageCount ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ServiceRequestDashboard;