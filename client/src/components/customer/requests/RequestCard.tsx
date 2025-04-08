import React from "react";
import { IUserRequestResponse } from "../../../types/requests";
import { Calendar, CarFront, Check, Clock } from "lucide-react";

const RequestCard: React.FC<{ request: IUserRequestResponse }> = ({ request }) => {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ready to pickup': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            case 'Pending': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div key={request.requestId} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="p-3 bg-gray-100 rounded-full mr-4">
                        <CarFront />
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
    )
}

export default RequestCard