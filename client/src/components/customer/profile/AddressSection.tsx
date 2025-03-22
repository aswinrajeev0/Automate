import React from "react";
import { TabsContent } from "../../ui/Tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/Form";
import { Building, Globe, Home, Loader2, MapPin, Pencil, Save } from "lucide-react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/button";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

const addressSchema = yup.object().shape({
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    streetAddress: yup.string().required("Street address is required"),
    buildingNo: yup.string().required("Building number is required"),
})

type AddressFormValues = yup.InferType<typeof addressSchema>

interface AddressSectionProps {
    isEditingAddress: boolean
    setIsEditingAddress: React.Dispatch<React.SetStateAction<boolean>>;
    isLoadingAddress: boolean
    setIsLoadingAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressSection: React.FC<AddressSectionProps> = ({
    isEditingAddress,
    setIsEditingAddress,
    isLoadingAddress,
    setIsLoadingAddress
}) => {

    const defaultAddressValues: AddressFormValues = {
        country: "United States",
        state: "California",
        city: "San Francisco",
        streetAddress: "123 Main Street",
        buildingNo: "Apt 4B",
    }

    const addressForm = useForm<AddressFormValues>({
        resolver: yupResolver(addressSchema),
        defaultValues: defaultAddressValues,
    })

    const onSubmitAddress = (data: AddressFormValues) => {
        setIsLoadingAddress(true)

        // Simulate API call
        setTimeout(() => {
            console.log("Address updated:", data)
            toast.success("Address updated successfully")
            setIsEditingAddress(false)
            setIsLoadingAddress(false)
        }, 1500)
    }

    const handleEditAddressToggle = () => {
        if (isEditingAddress) {
            addressForm.reset(defaultAddressValues)
        }
        setIsEditingAddress(!isEditingAddress)
    }

    return (
        <>
            <TabsContent value="address">
                <Card>
                    <CardHeader>
                        <CardTitle>Address Information</CardTitle>
                        <CardDescription>Update your address details</CardDescription>
                    </CardHeader>

                    <Form {...addressForm}>
                        <form onSubmit={addressForm.handleSubmit(onSubmitAddress)}>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={addressForm.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input {...field} disabled={!isEditingAddress} className="pl-10" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={addressForm.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input {...field} disabled={!isEditingAddress} className="pl-10" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={addressForm.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                        <Input {...field} disabled={!isEditingAddress} className="pl-10" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={addressForm.control}
                                    name="streetAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Street Address</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input {...field} disabled={!isEditingAddress} className="pl-10" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addressForm.control}
                                    name="buildingNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Building/Apartment Number</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                                    <Input {...field} disabled={!isEditingAddress} className="pl-10" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                <Button
                                    type="button"
                                    variant={isEditingAddress ? "outline" : "default"}
                                    onClick={handleEditAddressToggle}
                                >
                                    {isEditingAddress ? (
                                        "Cancel"
                                    ) : (
                                        <>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Edit Address
                                        </>
                                    )}
                                </Button>

                                {isEditingAddress && (
                                    <Button type="submit" disabled={isLoadingAddress}>
                                        {isLoadingAddress ? (
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
            </TabsContent>
        </>
    )
}

export default AddressSection