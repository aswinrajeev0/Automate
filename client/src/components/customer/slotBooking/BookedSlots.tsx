import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export interface BookedSlot {
    date: Date;
    time: string;
    endTime?: string;
    customerId?: string;
    workshopId?: string;
    type?: string;
    duration?: number;
    bookingId: string;
}

interface BookedSlotsProps {
    bookedSlots: BookedSlot[];
    onCancelBooking: (slotId: string) => void;
}

const BookedSlots: React.FC<BookedSlotsProps> = ({ bookedSlots, onCancelBooking }) => {
    const { customer } = useSelector((state: RootState) => state.customer);

    // Helper function to format the time range
    const formatTimeRange = (slot: BookedSlot) => {
        const startTime = slot.time.includes(':') ? slot.time : `${slot.time}:00`;
        
        // If we have an endTime, use it
        if (slot.endTime) {
            const formattedEndTime = slot.endTime.includes(':') ? slot.endTime : `${slot.endTime}:00`;
            return `${startTime} - ${formattedEndTime}`;
        }
        
        // Otherwise calculate based on duration
        if (slot.duration) {
            // Parse the start time
            const [hours, minutes] = startTime.split(':').map(Number);
            // Calculate end time
            const endHour = hours + slot.duration;
            const endHourFormatted = endHour.toString().padStart(2, '0');
            return `${startTime} - ${endHourFormatted}:${minutes.toString().padStart(2, '0')}`;
        }
        
        // Fallback - just show start time
        return startTime;
    };

    // Get the service type label
    const getServiceTypeLabel = (type?: string) => {
        if (!type) return "";
        
        const types: Record<string, string> = {
            minor: "Minor Service (1h)",
            interim: "Interim Service (2h)",
            major: "Major Service (3h)"
        };
        
        return types[type] || type;
    };

    return (
        <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>

            {bookedSlots.filter(slot => slot.customerId === customer?.id).length > 0 ? (
                <div className="space-y-2">
                    {bookedSlots
                        .filter(slot => slot.customerId === customer?.id)
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((slot, index) => (
                            <div key={index} className="bg-blue-50 p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{format(new Date(slot.date), 'EEEE, MMMM d, yyyy')}</div>
                                    <div className="text-gray-600">{formatTimeRange(slot)}</div>
                                    {slot.type && (
                                        <div className="text-xs text-blue-600 mt-1">
                                            {getServiceTypeLabel(slot.type)}
                                        </div>
                                    )}
                                </div>
                                <button 
                                    className="text-white hover:text-whitw-800 bg-red-500 p-1 rounded w-20"
                                    onClick={() => onCancelBooking && onCancelBooking(slot.bookingId)}
                                >
                                    Cancel
                                </button>
                            </div>
                        ))}
                </div>
            ) : (
                <p className="text-gray-500">You don't have any upcoming appointments.</p>
            )}
        </div>
    );
};

export default BookedSlots;