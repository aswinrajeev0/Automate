import { addDays, addMonths, eachDayOfInterval, endOfMonth, format, getDay, isBefore, isSameDay, startOfMonth, subMonths } from "date-fns";
import React, { useState } from "react";
import { BookedSlot } from "./BookedSlots";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useParams, useSearchParams } from "react-router-dom";
import { BookSlot, useBookSlot } from "../../../hooks/customer/useSlotBooking";

interface TimeSlot {
    isBooked?: any;
    label: string;
    value: string;
}

const morningTimeSlots: TimeSlot[] = [
    { label: '08:00 AM', value: '08:00' },
    { label: '09:00 AM', value: '09:00' },
    { label: '10:00 AM', value: '10:00' },
    { label: '11:00 AM', value: '11:00' },
    { label: '12:00 PM', value: '12:00' },
];

const afternoonTimeSlots: TimeSlot[] = [
    { label: '02:00 PM', value: '14:00' },
    { label: '03:00 PM', value: '15:00' },
    { label: '04:00 PM', value: '16:00' },
    { label: '05:00 PM', value: '17:00' },
    { label: '06:00 PM', value: '18:00' },
];

interface CalenderSectionProps {
    setBookingSubmitted: React.Dispatch<React.SetStateAction<boolean>>
    bookedSlots: BookedSlot[]
}

const CalenderSection: React.FC<CalenderSectionProps> = ({setBookingSubmitted, bookedSlots}) => {

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const {workshopId} = useParams();
    const [searchParams] = useSearchParams()
    const type = searchParams.get("type") || ""

    const {customer} = useSelector((state: RootState) => state.customer)

    const bookSlot = useBookSlot(workshopId as string, type)

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeSelection = (time: string) => {
        setSelectedTime(time);
    };

    const handleSubmit = async () => {
        if (selectedDate && selectedTime) {
            const newBooking: BookSlot = {
                date: selectedDate,
                time: selectedTime,
                customerId: customer?.id,
                workshopId,
                type
            };

            await bookSlot.mutateAsync(newBooking)

            // setBookedSlots([...bookedSlots, newBooking]);
            setBookingSubmitted(true);

            setTimeout(() => {
                // setSelectedDate(null);
                setSelectedTime(null);
                setBookingSubmitted(false);
            }, 3000);
        }
    };

    const isSlotBooked = (date: Date, time: string): boolean => {
        return bookedSlots.some(slot =>
            isSameDay(slot.date, date) && slot.time === time
        );
    };

    const generateDaysArray = () => {
        const firstDayOfMonth = startOfMonth(currentDate);
        const lastDayOfMonth = endOfMonth(currentDate);

        const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

        const startingDayIndex = getDay(firstDayOfMonth);

        const prefixDays = Array(startingDayIndex).fill(null);

        return [...prefixDays, ...daysInMonth];
    };

    const getAvailableTimesForSelectedDate = () => {
        if (!selectedDate) return { morning: morningTimeSlots, afternoon: afternoonTimeSlots };

        const morningAvailable = morningTimeSlots.map(slot => ({
            ...slot,
            isBooked: isSlotBooked(selectedDate, slot.value)
        }));

        const afternoonAvailable = afternoonTimeSlots.map(slot => ({
            ...slot,
            isBooked: isSlotBooked(selectedDate, slot.value)
        }));

        return { morning: morningAvailable, afternoon: afternoonAvailable };
    };

    const days = generateDaysArray();
    const availableTimes = getAvailableTimesForSelectedDate();
    const today = new Date();
    const isPastDate = (date: Date) => isBefore(date, addDays(today, -1));

    return (
        <>
            <div className="p-6 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Select Date</h2>
                    <div className="flex items-center">
                        <button
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <span className="text-lg font-medium mx-4">
                            {format(currentDate, 'MMMM yyyy')}
                        </span>
                        <button
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-center font-medium text-gray-500 text-sm py-2">
                            {day}
                        </div>
                    ))}

                    {days.map((day, index) => {
                        // Determine if this date has any bookings
                        const hasBookings = day ? bookedSlots.some(slot => isSameDay(slot.date, day)) : false;
                        const isDisabled = day ? isPastDate(day) : true;
                        const isSelected = day && selectedDate ? isSameDay(day, selectedDate) : false;

                        return (
                            <div
                                key={index}
                                className={`
                      relative h-12 flex items-center justify-center
                      ${!day ? 'text-gray-300' : 'cursor-pointer hover:bg-gray-50'}
                      ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                      ${isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
                      rounded-lg
                    `}
                                onClick={() => day && !isDisabled && handleDateClick(day)}
                            >
                                {day && (
                                    <>
                                        <span>{format(day, 'd')}</span>

                                        {/* Indicator for days with bookings */}
                                        {hasBookings && !isSelected && (
                                            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></span>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <span>Partially Booked</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        <span>Selected</span>
                    </div>
                </div>
            </div>

            {/* Time Selection Section */}
            <div className="p-6 md:w-1/2">
                <h2 className="text-xl font-semibold mb-6">
                    {selectedDate
                        ? `Select Time for ${format(selectedDate, 'EEEE, MMMM d, yyyy')}`
                        : 'Select a date first'}
                </h2>

                {selectedDate && (
                    <>
                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Morning</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {availableTimes.morning.map((slot) => (
                                    <button
                                        key={slot.value}
                                        className={`
                          p-3 rounded-lg transition-colors text-center
                          ${selectedTime === slot.value ? 'bg-blue-500 text-white' : ''}
                          ${slot.isBooked
                                                ? 'bg-red-100 text-red-800 cursor-not-allowed'
                                                : selectedTime !== slot.value ? 'bg-gray-100 hover:bg-gray-200' : ''}
                        `}
                                        onClick={() => !slot.isBooked && handleTimeSelection(slot.value)}
                                        disabled={slot.isBooked}
                                    >
                                        {slot.label}
                                        {slot.isBooked && <div className="text-xs mt-1">(Booked)</div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-3">Afternoon</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {availableTimes.afternoon.map((slot) => (
                                    <button
                                        key={slot.value}
                                        className={`
                          p-3 rounded-lg transition-colors text-center
                          ${selectedTime === slot.value ? 'bg-blue-500 text-white' : ''}
                          ${slot.isBooked
                                                ? 'bg-red-100 text-red-800 cursor-not-allowed'
                                                : selectedTime !== slot.value ? 'bg-gray-100 hover:bg-gray-200' : ''}
                        `}
                                        onClick={() => !slot.isBooked && handleTimeSelection(slot.value)}
                                        disabled={slot.isBooked}
                                    >
                                        {slot.label}
                                        {slot.isBooked && <div className="text-xs mt-1">(Booked)</div>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className={`
                    w-full p-3 rounded-lg text-white font-medium text-center transition-colors
                    ${(selectedDate && selectedTime)
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'}
                  `}
                            disabled={!selectedDate || !selectedTime}
                            onClick={handleSubmit}
                        >
                            Book Appointment
                        </button>
                    </>
                )}
            </div>
        </>
    )
}

export default CalenderSection