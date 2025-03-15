import React from "react";
import { SidebarTrigger } from "../Sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "../Input";
import { Button } from "../Button";

interface AdminHeaderProps {
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSidebarOpen: boolean;
  }

const AdminHeader: React.FC<AdminHeaderProps> = ({setIsSidebarOpen, isSidebarOpen}) => {
    return(
        <header className="bg-[#9b87f5] text-white px-6 py-4">
            <div className="flex h-12 items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger onClick={()=>setIsSidebarOpen(!isSidebarOpen)} className="text-white" />
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
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-[10px] font-medium text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-medium">A</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
    )
}

export default AdminHeader