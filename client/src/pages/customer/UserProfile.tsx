import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import {
    User, Mail, Phone, MapPin, Building,
    Home, Globe, Camera, Save, Pencil, Loader2
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../../components/ui/Form";
import { Input } from "../../components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar";
import { Label } from "../../components/ui/Label";
import { Textarea } from "../../components/ui/Textarea";
import { Header } from "../../components/customer/Header";

const profileSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits")
        .required("Phone number is required"),
    bio: yup.string().max(300, "Bio must be at most 300 characters"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    streetAddress: yup.string().required("Street address is required"),
    buildingNo: yup.string().required("Building number is required"),
});

type ProfileFormValues = yup.InferType<typeof profileSchema>;

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock user data - would be fetched from an API in a real app
    const defaultValues: ProfileFormValues = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        bio: "Car enthusiast and regular customer. I own a 2018 Honda Civic and a 2015 Toyota Camry.",
        country: "United States",
        state: "California",
        city: "San Francisco",
        streetAddress: "123 Main Street",
        buildingNo: "Apt 4B",
    };

    const form = useForm<ProfileFormValues>({
        resolver: yupResolver(profileSchema),
        defaultValues,
    });

    const onSubmit = (data: ProfileFormValues) => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Profile updated:", data);
            toast.success("Profile updated successfully");
            setIsEditing(false);
            setIsLoading(false);
        }, 1500);
    };

    const handleEditToggle = () => {
        if (isEditing) {
            form.reset(defaultValues);
        }
        setIsEditing(!isEditing);
    };

    return (<>
    <Header />
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Picture Card */}
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <Avatar className="w-32 h-32 mb-4">
                            <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                            <AvatarFallback className="text-3xl">
                                {defaultValues.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>

                        <div className="w-full mt-4">
                            <Label htmlFor="picture" className="text-center block mb-2">Update Picture</Label>
                            <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                disabled={!isEditing}
                                className="cursor-pointer"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Information Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Update your personal details and address
                        </CardDescription>
                    </CardHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-4">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Basic Information</h3>

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        disabled={!isEditing}
                                                        rows={3}
                                                        placeholder="Tell us a bit about yourself"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Address Info */}
                                <div className="pt-4 space-y-4">
                                    <h3 className="text-lg font-medium">Address Information</h3>

                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                            <Input
                                                                {...field}
                                                                disabled={!isEditing}
                                                                className="pl-10"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                            <Input
                                                                {...field}
                                                                disabled={!isEditing}
                                                                className="pl-10"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="streetAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Street Address</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="buildingNo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Building/Apartment Number</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            disabled={!isEditing}
                                                            className="pl-10"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                <Button
                                    type="button"
                                    variant={isEditing ? "outline" : "default"}
                                    onClick={handleEditToggle}
                                >
                                    {isEditing ? "Cancel" : (
                                        <>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit Profile
                                        </>
                                    )}
                                </Button>

                                {isEditing && (
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
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
        </div>
    </>
    );
};

export default UserProfile;