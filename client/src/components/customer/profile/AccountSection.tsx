import React from "react";
import { TabsContent } from "../../ui/Tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card";
import { Button } from "../../ui/button";
import { LogOut, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../../ui/alert-dialog";
import { toast } from "sonner";
import { customerLogout } from "../../../store/slices/customerSlice";
import { useCustomerDelete, useCustomerLogout } from "../../../hooks/customer/useCustomerAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";


const AccountSection: React.FC = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const customer = useSelector((state: RootState) => state.customer)
    
    const logout = useCustomerLogout()
    const deleteAccount = useCustomerDelete()

    const handleLogout = async () => {
        const response = await logout.mutateAsync()
        if (response.success) {
            dispatch(customerLogout())
            toast.success("Logged out successfully.")
            navigate("/login")
        }
    }
    
    const handleDeleteAccount = async () => {
        const response = await deleteAccount.mutateAsync()
        if(response.status === 200) {
            dispatch(customerLogout())
            toast.success("Account deleted successfully")
            navigate("/login")
        }
    }

    return (
        <>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Management</CardTitle>
                        <CardDescription>Manage your account settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Logout</h3>
                            <p className="text-muted-foreground mb-4">Sign out from your current session</p>
                            <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>

                        <div className="pt-6 border-t">
                            <h3 className="text-lg font-medium mb-2 text-destructive">Danger Zone</h3>
                            <p className="text-muted-foreground mb-4">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="w-full sm:w-auto">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Account
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your account and remove your data
                                            from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDeleteAccount}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Delete Account
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    )
}

export default AccountSection