import React from "react"
import { SidebarTrigger } from "../Sidebar"
import { Search } from "lucide-react"
import { Input } from "../Input"
import { Button } from "../Button"

interface WorkshopHeaderProps {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarOpen: boolean;
}

const WorkshopHeader: React.FC<WorkshopHeaderProps> = ({ setIsSidebarOpen, isSidebarOpen }) => {
    return (
        <header className="bg-red-500 text-white px-6 py-4">
            <div className="flex h-12 items-center justify-between">
                <div className="flex items-center gap-4">
                    <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white" />
                    <div className="relative flex w-64 items-center">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="relative text-white hover:bg-white/10"
                    >
                        <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
                            <span className="text-sm font-medium text-white">A</span>
                        </div>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default WorkshopHeader;