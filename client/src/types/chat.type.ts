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
    messages: Omit<IMessageType, "_id">[];
}