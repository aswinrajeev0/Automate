import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "../../ui/Dialog";
import { Textarea } from "../../ui/Textarea";
import { Button } from "../../ui/button";
import { Star } from "lucide-react";
import { useSubmitReview } from "../../../hooks/customer/useWorkshops";
import { useToaster } from "../../../hooks/ui/useToaster";

interface RatingDialogProps {
    workshopId: string;
    showRatingDialog: boolean;
    setShowRatingDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const RatingDialog: React.FC<RatingDialogProps> = ({ workshopId, showRatingDialog, setShowRatingDialog }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const { successToast, errorToast } = useToaster()

    const submitReview = useSubmitReview()

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Please select a rating before submitting.");
            return;
        }

        setLoading(true);
        try {
            const response = await submitReview.mutateAsync({ workshopId, rating, comment })
            if (response.status === 201) {
                successToast("Your review has been submitted")

                setRating(0);
                setComment('');
            } else {
                errorToast(response.data?.message || "Error submitting review")
            }
            setShowRatingDialog(false);
        } catch (error: any) {
            errorToast(error.response?.data || "Something went wrong")
        } finally {
            setLoading(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setShowRatingDialog(open);
        if (!open) {
            setRating(0);
            setComment('');
        }
    };

    return (
        <Dialog open={showRatingDialog} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center relative">
                        Rate Our App!
                        <DialogClose className="absolute right-0 top-0" />
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-center text-sm mb-4">Help us improve our tool to best suit your needs by rating us here!</p>
                    <div className="flex justify-center gap-2 my-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="p-2"
                                disabled={loading}
                            >
                                <Star
                                    className={`h-6 w-6 ${rating >= star ? "text-green-400 fill-green-400" : "text-gray-300"}`}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="mt-4">
                        <p className="text-sm mb-2">Can you tell us more?</p>
                        <Textarea
                            placeholder="Add feedback"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full"
                            disabled={loading}
                        />
                    </div>
                </div>
                <DialogFooter className="flex space-x-2 justify-between">
                    <Button variant="outline" onClick={() => setShowRatingDialog(false)} className="flex-1" disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default RatingDialog;