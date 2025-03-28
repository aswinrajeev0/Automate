import React from "react";
import { Card, CardContent } from "../../ui/Card";
import { IFeaturedWorkshop } from "../../../hooks/customer/useFeaturedWorkshop";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WorkshopCardProps {
    workshop: IFeaturedWorkshop;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({workshop}) => {

    const navigate = useNavigate()

    return (
        <Card key={workshop.workshopId} onClick={() => navigate(`/workshop-details/${workshop._id}`)} className="overflow-hidden border-none shadow-lg rounded-lg cursor-pointer">
            <div className="relative h-48">
                <img
                    src={workshop.image ? workshop.image : "./mechs.jpg"}
                    // src="./mechs.jpg"
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
                    <Heart className="h-5 w-5" />
                </div>
            </CardContent>
        </Card>
    )
}

export default WorkshopCard