import React from "react"
import { IReview } from "../../../hooks/customer/useWorkshops"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { MoreVertical, Star } from "lucide-react"
import { Button } from "../../ui/button"

interface ReviewSectionProps {
    reviews: IReview[];
    setShowRatingDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, setShowRatingDialog }) => {
    return (
        <div className="my-8">
            <div className="space-y-6">
                {reviews?.map((review) => {
                    const userName = typeof review.userId === "object" ? review.userId.name : "Unknown User";
                    return (
                        <div key={review.reviewId} className="flex gap-4">
                            <img
                                src="mechs2.jpg"
                                alt={userName}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-semibold">{userName}</p>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                                />
                                            ))}
                                            <span className="ml-2 text-sm text-gray-500">{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "N/A"}</span>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Report</DropdownMenuItem>
                                            <DropdownMenuItem>Copy text</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <p className="mt-2">{review.comment}</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>

            <div className="mt-8 ml-60">
                <Button
                    variant="outline"
                    className="w-250  hover:bg-gray-400 text-black"
                    onClick={() => setShowRatingDialog(true)}
                >
                    Submit a review
                </Button>
            </div>
        </div>
    )
}

export default ReviewSection