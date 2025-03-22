import React from "react";
import { TabsContent } from "../../ui/Tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/Avatar";
import { Label } from "../../ui/Label";
import { Input } from "../../ui/Input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/Form";
import { Loader2, Mail, Pencil, Phone, Save, User } from "lucide-react";
import { Button } from "../../ui/button";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const profileSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits")
        .required("Phone number is required"),
    // bio: yup.string().max(300, "Bio must be at most 300 characters"),
})

type ProfileFormValues = yup.InferType<typeof profileSchema>

interface ProfileSectionProps {
    isEditingProfile: boolean;
    setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
    isLoadingProfile: boolean;
    setIsLoadingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ isEditingProfile, setIsEditingProfile, isLoadingProfile, setIsLoadingProfile }) => {

    const { customer } = useSelector((state: RootState) => state.customer)

    const defaultProfileValues: ProfileFormValues = {
        name: customer?.name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
        // bio: "Car enthusiast and regular customer. I own a 2018 Honda Civic and a 2015 Toyota Camry.",
    }

    const profileForm = useForm<ProfileFormValues>({
        resolver: yupResolver(profileSchema),
        defaultValues: defaultProfileValues,
    })

    const onSubmitProfile = (data: ProfileFormValues) => {
        setIsLoadingProfile(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Profile updated:", data)
            toast.success("Profile updated successfully")
            setIsEditingProfile(false)
            setIsLoadingProfile(false)
        }, 1500)
    }

    const handleEditProfileToggle = () => {
        if (isEditingProfile) {
            profileForm.reset(defaultProfileValues)
        }
        setIsEditingProfile(!isEditingProfile)
    }


    return (
        <>
            <TabsContent value="profile">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Picture Card */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <Avatar className="w-32 h-32 mb-4">
                                <AvatarImage src={`${customer?.name ? customer.image : "https://github.com/shadcn.png"}`} alt={customer?.name} />
                                <AvatarFallback className="text-3xl">
                                    {defaultProfileValues.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div className="w-full mt-4">
                                <Label htmlFor="picture" className="text-center block mb-2">
                                    Update Picture
                                </Label>
                                <Input
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    disabled={!isEditingProfile}
                                    className="cursor-pointer"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Information Card */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>

                        <Form {...profileForm}>
                            <form onSubmit={profileForm.handleSubmit(onSubmitProfile)}>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={profileForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input {...field} disabled={!isEditingProfile} className="pl-10" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={profileForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input {...field} disabled={!isEditingProfile} className="pl-10" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={profileForm.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input {...field} disabled={!isEditingProfile} className="pl-10" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* <FormField
                                        control={profileForm.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        disabled={!isEditingProfile}
                                                        rows={3}
                                                        placeholder="Tell us a bit about yourself"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                </CardContent>

                                <CardFooter className="flex justify-between">
                                    <Button
                                        type="button"
                                        variant={isEditingProfile ? "outline" : "default"}
                                        onClick={handleEditProfileToggle}
                                    >
                                        {isEditingProfile ? (
                                            "Cancel"
                                        ) : (
                                            <>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit Profile
                                            </>
                                        )}
                                    </Button>

                                    {isEditingProfile && (
                                        <Button type="submit" disabled={isLoadingProfile}>
                                            {isLoadingProfile ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save Changes
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </TabsContent>
        </>
    )
}

export default ProfileSection;