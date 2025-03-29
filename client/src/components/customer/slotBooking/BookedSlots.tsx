import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export interface BookedSlot {
    date: Date;
    time: string;
    customerId?: string;
    workshopId?: string;
}

interface BookedSlotsProps {
    bookedSlots: BookedSlot[]
}

const BookedSlots: React.FC<BookedSlotsProps> = ({bookedSlots}) => {

    const {customer} = useSelector((state: RootState) => state.customer)

    return (
        <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>

            {bookedSlots.filter(slot => slot.customerId === customer?.id).length > 0 ? (
                <div className="space-y-2">
                    {bookedSlots
                        .filter(slot => slot.customerId === customer?.id)
                        // .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((slot, index) => (
                            <div key={index} className="bg-blue-50 p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{format(slot.date, 'EEEE, MMMM d, yyyy')}</div>
                                    <div className="text-gray-600">{slot.time.includes(':') ? slot.time : `${slot.time}:00`}</div>
                                </div>
                                <button className="text-red-600 hover:text-red-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                </div>
            ) : (
                <p className="text-gray-500">You don't have any upcoming appointments.</p>
            )}
        </div>
    )
}

export default BookedSlots