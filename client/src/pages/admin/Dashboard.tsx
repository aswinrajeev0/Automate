import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  LogOut,
  DollarSign
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from "../../components/ui/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../store/slices/adminSlice";
import { useToaster } from "../../hooks/ui/useToaster";
import { useAdminLogout } from "../../hooks/admin/useAdminAuth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { successToast } = useToaster();
  // const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSideBarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch()
  const logOut = useAdminLogout()

  const handleLogout = async () => {
    const response = await logOut.mutateAsync();
    if (response) {
      dispatch(adminLogout())
      successToast(
        "You have been successfully logged out of admin panel"
      );
      navigate("/admin/login");
    }

  };

  // Menu items based on the design
  const menuItems = [
    { id: "dashboard", title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { id: "customers", title: "Customers", icon: Users, path: "/admin/customers" },
    { id: "workshops", title: "Workshops", icon: Calendar, path: "/admin/workshops" },
    { id: "requests", title: "Requests", icon: FileText, path: "/admin/requests" },
    { id: "revenue", title: "Revenue Report", icon: DollarSign, path: "/admin/revenue-report" },
    { id: "approvals", title: "Pending Approvals", icon: AlertTriangle, path: "/admin/approvals" },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        {/* Admin Sidebar */}
        <Sidebar variant="sidebar" className="bg-[#9b87f5] text-black">
          <SidebarHeader className="border-b border-white/10">
            <div className="flex items-center gap-2 px-4 py-4">
              <div className="bg-black rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <span className="font-bold tracking-wide text-xl">AUTOMATE</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2 py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="py-3 text-black hover:bg-white/10 flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-white/10 p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="py-3 text-black hover:bg-white/10">
                  <LogOut className="h-5 w-5" />
                  <span className="text-base">Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className={`flex-1 bg-gray-50 ${isSideBarOpen ? "ml-50" : "ml-0"}`}>
          {/* Header */}
          <AdminHeader setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSideBarOpen} />
          <main className="p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
