import { addDays, addMonths, eachDayOfInterval, endOfMonth, format, getDay, isBefore, isSameDay, startOfMonth, subMonths, addHours, isWithinInterval } from "date-fns";
import { RRule } from 'rrule';
import React, { useState, useEffect } from "react";
import { BookedSlot } from "./BookedSlots";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useParams, useSearchParams } from "react-router-dom";
import { BookSlot, useBookSlot } from "../../../hooks/customer/useSlotBooking";
import PaymentModal from "../payment/PaymentModal";

const SERVICE_DURATIONS = {
  basic: 1,
  interim: 2,
  full: 3
};

interface TimeSlot {
  isBooked?: boolean;
  isPartiallyBooked?: boolean;
  label: string;
  value: string;
  endTime?: string;
  conflictingService?: string;
}

// Generates all available time slots
const generateTimeSlots = () => {
  const morningSlots: TimeSlot[] = [];
  const afternoonSlots: TimeSlot[] = [];

  // Generate morning slots (8am-12pm)
  for (let hour = 8; hour <= 12; hour++) {
    const hourStr = hour.toString().padStart(2, '0');
    const label = hour === 12 ? '12:00 PM' : `${hour}:00 AM`;
    morningSlots.push({
      label,
      value: `${hourStr}:00`,
      endTime: `${hourStr}:00`
    });
  }

  // Generate afternoon slots (2pm-6pm)
  for (let hour = 14; hour <= 18; hour++) {
    const hourStr = hour.toString().padStart(2, '0');
    const displayHour = hour > 12 ? hour - 12 : hour;
    const label = `${displayHour}:00 PM`;
    afternoonSlots.push({
      label,
      value: `${hourStr}:00`,
      endTime: `${hourStr}:00`
    });
  }

  return { morning: morningSlots, afternoon: afternoonSlots };
};

const baseTimeSlots = generateTimeSlots();

interface CalenderSectionProps {
  setBookingSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  bookedSlots: BookedSlot[];
}

const CalenderSection: React.FC<CalenderSectionProps> = ({ setBookingSubmitted, bookedSlots }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [overlappingServiceInfo, setOverlappingServiceInfo] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const { workshopId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "basic";

  const { customer } = useSelector((state: RootState) => state.customer);
  const bookSlot = useBookSlot(workshopId as string, type);

  const serviceDuration = SERVICE_DURATIONS[type as keyof typeof SERVICE_DURATIONS] || 1;

  useEffect(() => {
    const startDate = new Date();
    const endDate = addMonths(startDate, 1);

    const rule = new RRule({
      freq: RRule.DAILY,
      dtstart: startDate,
      until: endDate,
      byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA] // Exclude Sundays
    });

    const dates = rule.all();
    setAvailableDates(dates);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setOverlappingServiceInfo(null);
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setOverlappingServiceInfo(null);
  };

  const handleBookingClick = () => {
    setIsPaymentModalOpen(true)
  }

  const bookingDetails = {
    date: selectedDate,
    time: selectedTime,
    type,
    duration: serviceDuration,
    price: type === "basic" ? 1500 : type === "interim" ? 5000 : 7000
  }

  const handleSubmit = async (finalAmount: number, gstAmount: number) => {
    if (selectedDate && selectedTime) {
      const selectedHour = parseInt(selectedTime.split(':')[0]);
      const selectedMinute = parseInt(selectedTime.split(':')[1] || '0');

      const bookingDate = new Date(selectedDate);
      bookingDate.setHours(selectedHour, selectedMinute, 0, 0);

      const endTime = addHours(bookingDate, serviceDuration);
      const endTimeString = format(endTime, 'HH:mm');

      const { isBooked, isPartiallyBooked, conflictingService } = checkSlotAvailability(
        selectedDate,
        { value: selectedTime, label: "", endTime: endTimeString }
      );

      if (isBooked || isPartiallyBooked) {
        setOverlappingServiceInfo(
          `This slot overlaps with an existing ${conflictingService || ""} service. Please select another time.`
        );
        return;
      }

      const newBooking: BookSlot = {
        date: bookingDate,
        time: selectedTime,
        endTime: endTimeString,
        customerId: customer?.id,
        workshopId,
        type,
        duration: serviceDuration,
        price: type === "basic" ? 1500 : type === "interim" ? 5000 : 7000,
        amount: finalAmount,
        gst: gstAmount
      };

      await bookSlot.mutateAsync(newBooking);
      setBookingSubmitted(true);

      setTimeout(() => {
        setSelectedTime(null);
        setBookingSubmitted(false);
        setOverlappingServiceInfo(null);
      }, 3000);
    }
  };

  const checkSlotAvailability = (date: Date, timeSlot: TimeSlot): {
    isBooked: boolean;
    isPartiallyBooked: boolean;
    conflictingService?: string;
  } => {
    if (!date) return { isBooked: false, isPartiallyBooked: false };

    const [hours, minutes] = timeSlot.value.split(':').map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(hours, minutes, 0, 0);

    const slotEnd = addHours(slotStart, serviceDuration);

    for (const bookedSlot of bookedSlots) {
      const bookedDate = new Date(bookedSlot.date);
      const [bookedHours, bookedMinutes] = bookedSlot.time.split(':').map(Number);
      bookedDate.setHours(bookedHours, bookedMinutes, 0, 0);

      const bookedSlotDuration = bookedSlot.duration || 1;
      const bookedEnd = addHours(bookedDate, bookedSlotDuration);

      const newSlotStartsDuringExisting = isWithinInterval(slotStart, {
        start: bookedDate,
        end: new Date(bookedEnd.getTime() - 1)
      });

      const newSlotEndsDuringExisting = isWithinInterval(
        new Date(slotEnd.getTime() - 1),
        { start: bookedDate, end: bookedEnd }
      );

      const newSlotContainsExisting = slotStart <= bookedDate && slotEnd >= bookedEnd;

      const existingContainsNewSlot = bookedDate <= slotStart && bookedEnd >= slotEnd;

      if (newSlotStartsDuringExisting || newSlotEndsDuringExisting ||
        newSlotContainsExisting || existingContainsNewSlot) {
        return {
          isBooked: true,
          isPartiallyBooked: false,
          conflictingService: bookedSlot.type
        };
      }
    }

    return { isBooked: false, isPartiallyBooked: false };
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
    if (!selectedDate) return { morning: [], afternoon: [] };

    const morningAvailable = baseTimeSlots.morning.map(slot => {
      const { isBooked, isPartiallyBooked, conflictingService } = checkSlotAvailability(selectedDate, slot);
      return {
        ...slot,
        isBooked,
        isPartiallyBooked,
        conflictingService
      };
    });

    const afternoonAvailable = baseTimeSlots.afternoon.map(slot => {
      const { isBooked, isPartiallyBooked, conflictingService } = checkSlotAvailability(selectedDate, slot);
      return {
        ...slot,
        isBooked,
        isPartiallyBooked,
        conflictingService
      };
    });

    const filteredMorning = morningAvailable.filter(slot => {
      const [hours, minutes] = slot.value.split(':').map(Number);
      return hours + serviceDuration <= 12;
    });

    const filteredAfternoon = afternoonAvailable.filter(slot => {
      const [hours, minutes] = slot.value.split(':').map(Number);
      return hours + serviceDuration <= 18;
    });

    return { morning: filteredMorning, afternoon: filteredAfternoon };
  };

  const days = generateDaysArray();
  const availableTimes = getAvailableTimesForSelectedDate();
  const today = new Date();
  const isPastDate = (date: Date) => isBefore(date, addDays(today, -1));

  const hasAvailability = (date: Date) => {
    if (!date) return false;

    const isAvailableDay = availableDates.some(availableDate =>
      isSameDay(availableDate, date)
    );

    if (!isAvailableDay) return false;

    const checkTimes = ["08:00", "10:00", "14:00", "16:00"];

    for (const time of checkTimes) {
      const { isBooked } = checkSlotAvailability(date, { label: "", value: time });
      if (!isBooked) return true;
    }

    return false;
  };

  return (
    <>
      <div className="p-6 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Select Date ({type} service - {serviceDuration} hour{serviceDuration > 1 ? 's' : ''})
          </h2>
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
            const hasAvailable = day ? hasAvailability(day) : false;
            const isDisabled = day ? isPastDate(day) || !hasAvailable : true;
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

                    {hasAvailable && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
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
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            <span>Selected</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:w-1/2">
        <h2 className="text-xl font-semibold mb-6">
          {selectedDate
            ? `Select Time for ${format(selectedDate, 'EEEE, MMMM d, yyyy')}`
            : 'Select a date first'}
        </h2>

        {overlappingServiceInfo && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {overlappingServiceInfo}
          </div>
        )}

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
                        : slot.isPartiallyBooked
                          ? 'bg-yellow-100 text-yellow-800'
                          : selectedTime !== slot.value ? 'bg-gray-100 hover:bg-gray-200' : ''}
                    `}
                    onClick={() => !slot.isBooked && handleTimeSelection(slot.value)}
                    disabled={slot.isBooked}
                    title={slot.isBooked && slot.conflictingService ? `Conflicts with ${slot.conflictingService} service` : ''}
                  >
                    <div>{slot.label}</div>
                    <div className="text-xs mt-1">
                      {slot.isBooked
                        ? `${slot.conflictingService ? `Booked (${slot.conflictingService})` : 'Unavailable'}`
                        : `${serviceDuration} hour${serviceDuration > 1 ? 's' : ''}`}
                    </div>
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
                        : slot.isPartiallyBooked
                          ? 'bg-yellow-100 text-yellow-800'
                          : selectedTime !== slot.value ? 'bg-gray-100 hover:bg-gray-200' : ''}
                    `}
                    onClick={() => !slot.isBooked && handleTimeSelection(slot.value)}
                    disabled={slot.isBooked}
                    title={slot.isBooked && slot.conflictingService ? `Conflicts with ${slot.conflictingService} service` : ''}
                  >
                    <div>{slot.label}</div>
                    <div className="text-xs mt-1">
                      {slot.isBooked
                        ? `${slot.conflictingService ? `Booked (${slot.conflictingService})` : 'Unavailable'}`
                        : `${serviceDuration} hour${serviceDuration > 1 ? 's' : ''}`}
                    </div>
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
              onClick={() => handleBookingClick()}
            >
              Book {type} Service ({serviceDuration} hour{serviceDuration > 1 ? 's' : ''})
            </button>
          </>
        )}
      </div>
      <PaymentModal
        isPaymentModalOpen={isPaymentModalOpen}
        handleSubmit={handleSubmit}
        setIsPaymentModalOpen={setIsPaymentModalOpen}
        bookingDetails={bookingDetails}
      />
    </>
  );
};

export default CalenderSection;