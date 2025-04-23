import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites, useHandelFavorite } from '../../hooks/customer/useWorkshops';
import { IFavoriteWorkshops } from '../../types/workshop.type';
import { Card, CardContent } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/customer/Header';
import { Footer } from '../../components/customer/Footer';
import { useToaster } from '../../hooks/ui/useToaster';
import { Pagination1 } from '../../components/admin/Pagination1';

const FavoritesPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const { successToast, errorToast } = useToaster();
    const navigate = useNavigate();
    const limit = 8;

    const { data: favoritesData } = useFavorites(currentPage, limit);
    const favorites = (favoritesData?.workshops || []) as IFavoriteWorkshops[];
    const totalPages = Math.ceil(favoritesData.total/limit) || 1;

    const handleFavoriteStatus = useHandelFavorite();

    const handleRemoveFavorite = async (workshopId: string) => {
        try {
            const response = await handleFavoriteStatus.mutateAsync({ workshopId, status: false });
            if (response?.success) {
                successToast(response?.message || "Update success")
            } else {
                errorToast(response.message || "Something went wrong")
            }
        } catch (error: any) {
            errorToast(error?.data?.message)
        }
    };

    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Favorites</h1>
                    <p className="text-gray-600">All your favorite workshops in one place</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {favorites
                        .map(workshop => (
                            <Card key={workshop.workshopId} onClick={() => navigate(`/workshop-details/${workshop.workshopId}`)} className="overflow-hidden border-none shadow-lg rounded-lg cursor-pointer">
                                <div className="relative h-48">
                                    <img
                                        src={workshop.image ? workshop.image : "./mechs.jpg"}
                                        alt={workshop.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="bg-amber-300 p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold">{workshop.name}</h3>
                                            {/* <p className="text-sm">{workshop.state}</p> */}
                                            <p className="text-sm">{workshop.city}</p>
                                        </div>
                                        <Heart
                                            onClick={() => handleRemoveFavorite(workshop.workshopId)}
                                            size={18}
                                            className="text-red-500 fill-red-500"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
                <Pagination1
                    currentPage={currentPage}
                    onPageNext={() => setCurrentPage(currentPage + 1)}
                    onPagePrev={() => setCurrentPage(currentPage - 1)}
                    totalPages={totalPages}
                />
            </div>
            <Footer />
        </>
    );
};

export default FavoritesPage;