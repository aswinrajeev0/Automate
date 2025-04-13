import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatConversation from "../../components/chat/ChatConversation";
import { Header } from "../../components/customer/Header";
import { Footer } from "../../components/customer/Footer";
import { useFetchConversations } from "../../hooks/chat/useChat";
import { IConversationType } from "../../types/chat.type";

interface ChatInterfaceProps {
    userType: "customer" | "workshop";
}

const ChatInterface = ({ userType }: ChatInterfaceProps) => {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

    const {data: fetchConversationData} = useFetchConversations(userType)
    const conversations = (fetchConversationData?.conversations || []) as IConversationType[]
    console.log(conversations);

    const selectedConversation = conversations.find(
        (conversation) => conversation._id === selectedConversationId
    );

    return (
        <>
        <Header />
        <br />
            <div className="flex h-[calc(100vh-12rem)] mx-40">
                <ChatSidebar
                    conversations={conversations}
                    selectedConversationId={selectedConversationId}
                    onSelectConversation={setSelectedConversationId}
                    userType={userType}
                />

                {selectedConversation ? (
                    <ChatConversation
                        conversation={selectedConversation}
                        userType={userType}
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <MessageCircle className="h-16 w-16 mb-4 opacity-20" />
                        <p className="text-lg font-medium">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ChatInterface;