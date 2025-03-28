import React from "react";
import { Button } from "../../ui/button";
import { Heart, MessageCircle, Phone } from "lucide-react";
import { IWorkshop } from "../../../hooks/customer/useWorkshops";

interface WorkshopDetailsSectionProps {
    workshop: IWorkshop
}

const WorkshopDetailsSection: React.FC<WorkshopDetailsSectionProps> = ({workshop}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className='flex align-middle justify-center'>
                <img
                    src={workshop?.image ? workshop?.image : "/mechs2.jpg"}
                    alt={workshop?.name}
                    className="w-100 h-auto rounded-lg object-cover"
                    style={{ maxHeight: '400px' }}
                />
            </div>
            <div className='w-100 flex align-middle justify-center'>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{workshop?.name}</h1>
                    <div className='h-60'>
                        <p className="text-gray-700 mb-6">{workshop?.bio}</p>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-6">
                        {/* <Button variant="outline" className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Map View</span>
              </Button> */}

                        <Button variant="outline" className="flex items-center gap-2">
                            <Heart size={18} className="text-yellow-400" />
                        </Button>

                        <Button variant="outline" className="flex items-center gap-2">
                            <MessageCircle size={18} />
                        </Button>

                        <Button variant="outline" className="flex items-center gap-2">
                            <Phone size={18} />
                        </Button>
                    </div>

                    <Button className="w-full bg-black hover:bg-black/85 text-white mb-6">
                        Request a serivice
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WorkshopDetailsSection