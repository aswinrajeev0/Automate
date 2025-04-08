import { useState } from 'react';
import { Search, Calendar, Filter, ArrowUpDown } from 'lucide-react';
import { Header } from '../../components/customer/Header';
import { Footer } from '../../components/customer/Footer';
import { useGetAllRequests } from '../../hooks/customer/useServiceRequests';
import { IUserRequestResponse } from '../../types/requests';
import RequestCard from '../../components/customer/requests/RequestCard';
import { Pagination1 } from '../../components/admin/Pagination1';

const ServiceRequestDashboard = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');

    const limit = 10;

    const {data, isLoading, isError} = useGetAllRequests(currentPage, limit);

    const requests = (data?.requests || []) as IUserRequestResponse[];
    const totalPages = Math.ceil(data?.totalRequests/limit) || 1

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

                        {/* <div className="flex gap-2">
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
                        </div> */}
                    </div>

                    {/* Request cards */}
                    <div className="space-y-4">
                        {requests.map((request) => (
                            <RequestCard request={request} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination1
                        currentPage={currentPage}
                        onPageNext={() => setCurrentPage(currentPage+1)}
                        onPagePrev={() => setCurrentPage(currentPage-1)}
                        totalPages={totalPages}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ServiceRequestDashboard;