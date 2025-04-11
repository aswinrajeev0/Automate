export interface WorkshopSlot {
    _id: string;
    date: string;
    startTime: string;
    endTime: string;
    serviceType: 'basic' | 'interim' | 'full';
    maxBookings: number;
    currentBookings: number;
    isAvailable: boolean;
}

export interface ServiceTypeInfo {
    name: string;
    duration: number;
}

export interface IFormData {
    date: string;
    openingTime: string;
    closingTime: string;
    serviceType: 'basic' | 'interim' | 'full';
    maxBookings: number;
}

export interface ITimeSlot {
    startTime: string;
    endTime: string;
}