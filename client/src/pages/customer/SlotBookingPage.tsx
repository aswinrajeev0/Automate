import React, { useState } from 'react';
import { Header } from '../../components/customer/Header';
import { Footer } from '../../components/customer/Footer';
import BookedSlots from '../../components/customer/slotBooking/BookedSlots';
import CalenderSection from '../../components/customer/slotBooking/CalenderSection';
import { useBookedSlots } from '../../hooks/customer/useSlotBooking';
import { useParams, useSearchParams } from 'react-router-dom';


const SlotBookingPage: React.FC = () => {
    const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

    const { workshopId } = useParams()
    const [searchParams] = useSearchParams()
    const type = searchParams.get("type") || ""

    const { data, isLoading, error } = useBookedSlots(workshopId as string, type)

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="p-4 md:p-8 max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Book Your Appointment</h1>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500 text-lg">
                                Loading booking information...
                                <div className="mt-4 flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="p-4 md:p-8 max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Book Your Appointment</h1>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="text-red-600 text-lg">
                            <p>Error loading booking information</p>
                            <p className="mt-2 text-sm">
                                {(error instanceof Error) ? error.message : 'An unexpected error occurred'}
                            </p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="p-4 md:p-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Book Your Appointment</h1>

                {bookingSubmitted && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        Your booking has been successfully scheduled!
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Calendar Section */}
                        <CalenderSection setBookingSubmitted={setBookingSubmitted} bookedSlots={data.bookings} />
                    </div>

                    {/* Booked Slots Section */}
                    <BookedSlots bookedSlots={data.bookings} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SlotBookingPage;