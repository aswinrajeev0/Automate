export interface IMessageType {
    _id: string;
    content: string;
    sender: "customer" | "workshop";
    timestamp: string;
    status: "sent" | "delivered" | "read";
}

export interface IConversationType {
    _id: string;
    customerId: string;
    customerName: string;
    workshopId: string;
    workshopName: string;
    latestMessage: {
        content: string;
        timestamp: Date;
        sender: string;
        status: string;
    };
}

export interface IFallbackUser {
    _id: string;
    name: string;
}