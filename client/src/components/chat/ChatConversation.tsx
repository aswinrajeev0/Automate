import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { io, Socket } from "socket.io-client";
import { IConversationType, IMessageType } from "../../types/chat.type";
import { format } from "date-fns";
import { useGetMessages } from "../../hooks/chat/useChat";

interface ChatConversationProps {
    conversation: IConversationType;
    userType: "customer" | "workshop";
    onNewMessage: (newMsg: any) => void;
}

const socket: Socket = io(import.meta.env.VITE_HOST);

const ChatConversation = ({
    conversation,
    userType,
    onNewMessage
}: ChatConversationProps) => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState<IMessageType[]>([]);
    const [hasLoadedMessages, setHasLoadedMessages] = useState(false);
    const [isOnline, setIsOnline] = useState(false);

    const { data: messagesData } = useGetMessages(conversation._id, userType);

    useEffect(() => {
        if (messagesData?.messages && !hasLoadedMessages) {
            setMessages(messagesData.messages);
            setHasLoadedMessages(true);
        }
    }, [messagesData, hasLoadedMessages]);

    useEffect(() => {
        setMessages([]);
        setHasLoadedMessages(false);
    }, [conversation._id]);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const userId = userType === "customer" ? conversation.customerId : conversation.workshopId;
        socket.emit("joinRoom", conversation._id, userId);

        const handleReceiveMessage = (message: IMessageType) => {
            setMessages((prev) => [...prev, message]);
            onNewMessage(message);
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [conversation._id]);

    useEffect(() => {
        const recipientId = userType === "customer" ? conversation.workshopId : conversation.customerId;

        const handleOnlineStatus = (data: { id: string; online: boolean }) => {
            if (data.id === recipientId) {
                setIsOnline(data.online);
            }
        };

        socket.on("onlineStatus", handleOnlineStatus);

        return () => {
            socket.off("onlineStatus", handleOnlineStatus);
        };
    }, [conversation._id, userType]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message: Omit<IMessageType, "_id"> = {
            content: newMessage,
            sender: userType,
            timestamp: new Date().toISOString(),
            status: "sent"
        };

        socket.emit("sendMessage", {
            roomId: conversation._id,
            message
        });
        setNewMessage("");
    };

    useEffect(scrollToBottom, [messages]);

    const recipientName = userType === "customer"
        ? conversation.workshopName
        : conversation.customerName;

    return (
        <div className="flex-1 flex flex-col max-h-140">
            {/* Chat header */}
            <div className="px-6 py-3 border-b border-gray-200 flex items-center">
                <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-white mr-3",
                    userType === "customer" ? "bg-orange-500" : "bg-blue-500"
                )}>
                    {recipientName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 className="font-medium text-gray-900">{recipientName}</h2>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        {userType === "customer" ? "Auto Repair Shop" : "Customer"}
                        <span className={cn(
                            "h-2 w-2 rounded-full",
                            isOnline ? "bg-green-500" : "bg-gray-400"
                        )}>
                        </span>
                        <span>{isOnline ? "Online" : "Offline"}</span>
                    </p>
                </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 overflow-x-scroll">
                {messages.map((message, index) => {
                    console.log("Message", message)
                    const isCurrentUser =
                        (userType === "customer" && message.sender === "customer") ||
                        (userType === "workshop" && message.sender === "workshop");

                    return (
                        <>
                            <div
                                key={index}
                                className={cn(
                                    "flex",
                                    isCurrentUser ? "justify-end" : "justify-start"
                                )}
                            >
                                <div className={cn(
                                    "max-w-[70%] rounded-lg px-4 py-2 shadow-sm",
                                    isCurrentUser
                                        ? "bg-blue-500 text-white rounded-br-none"
                                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                                )}>
                                    <p>{message.content}</p>
                                    <div className={cn(
                                        "text-xs mt-1 flex items-center justify-end space-x-1",
                                        isCurrentUser ? "text-blue-100" : "text-gray-500"
                                    )}>
                                        <span>
                                            {format(message.timestamp, "hh:mm a")}
                                        </span>
                                        {isCurrentUser && message.status === "read" && (
                                            <Check className="h-3 w-3" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="px-4 py-3 border-t border-gray-200 h-1">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button
                        type="button"
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <Paperclip className="h-5 w-5" />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={`Message ${recipientName}...`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className={cn(
                            "p-2 rounded-full text-white transition-colors",
                            newMessage.trim()
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-300 cursor-not-allowed"
                        )}
                        disabled={!newMessage.trim()}
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatConversation;