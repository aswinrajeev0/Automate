import React from "react";
import { Card, CardContent } from "../../ui/Card";
import { IFeaturedWorkshop } from "../../../hooks/customer/usePartialWorkshop";
import { Star } from "lucide-react";

interface WorkshopCardProps {
    workshop: IFeaturedWorkshop;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({workshop}) => {
    return (
        <Card key={workshop.workshopId} className="overflow-hidden border-none shadow-lg rounded-lg">
            <div className="relative h-48">
                <img
                    // src={workshop.image}
                    src="./mechs.jpg"
                    alt={workshop.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <CardContent className="bg-amber-300 p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold">{workshop.name}</h3>
                        <p className="text-sm">{workshop.state}</p>
                        <p className="text-sm">{workshop.city}</p>
                    </div>
                    <Star className="h-5 w-5" />
                </div>
            </CardContent>
        </Card>
    )
}

export default WorkshopCard