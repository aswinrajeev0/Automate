// import { useState, useEffect } from 'react';
// import { Search, Filter, Star } from 'lucide-react';
// import { Card, CardContent } from '../../components/ui/Card';
// import { Input } from '../../components/ui/Input';
// import { Button } from '../../components/ui/button';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '../../components/ui/pagination';
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// // } from '../../components/ui/dropdown-menu';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '../../components/ui/Dialog';
// import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
// import { Label } from '../../components/ui/Label';
// import { Slider } from '../../components/ui/slider';
// import { Footer } from '../../components/customer/Footer';
// import { Header } from '../../components/customer/Header';
// import CategoryFilter from '../../components/customer/workshop/Filters/CategoryFilter';
// import WorkshopCard from '../../components/customer/workshop/WorkshopCard';

// // Mock data for workshops
// const mockWorkshops = [
//   {
//     id: 1,
//     name: 'Auto King Workshop',
//     location: 'Muscat, Oman',
//     image: '/mech1.jpg',
//     rating: 4.5,
//     price: 50,
//     category: 'Auto Repair',
//     availability: 'Weekdays',
//   },
//   {
//     id: 2,
//     name: 'Car Mechanic Pro',
//     location: 'Dubai, UAE',
//     image: '/public/workshop2.jpg',
//     rating: 4.8,
//     price: 65,
//     category: 'Tire Service',
//     availability: 'All Week',
//   },
//   {
//     id: 3,
//     name: 'Engine Masters',
//     location: 'Riyadh, Saudi Arabia',
//     image: '/public/workshop1.jpg',
//     rating: 4.2,
//     price: 45,
//     category: 'Engine Repair',
//     availability: 'Weekends',
//   },
//   {
//     id: 4,
//     name: 'Quick Fix Auto',
//     location: 'Abu Dhabi, UAE',
//     image: '/public/workshop2.jpg',
//     rating: 4.0,
//     price: 40,
//     category: 'Quick Service',
//     availability: 'Weekdays',
//   },
//   {
//     id: 5,
//     name: 'Pro Mechanics',
//     location: 'Muscat, Oman',
//     image: '/public/workshop1.jpg',
//     rating: 4.7,
//     price: 55,
//     category: 'Full Service',
//     availability: 'All Week',
//   },
//   {
//     id: 6,
//     name: 'Auto Experts',
//     location: 'Doha, Qatar',
//     image: '/public/workshop2.jpg',
//     rating: 4.6,
//     price: 60,
//     category: 'Diagnostics',
//     availability: 'Weekdays',
//   },
//   {
//     id: 7,
//     name: 'CarLife Workshop',
//     location: 'Kuwait City, Kuwait',
//     image: '/public/workshop1.jpg',
//     rating: 4.3,
//     price: 48,
//     category: 'Auto Repair',
//     availability: 'All Week',
//   },
//   {
//     id: 8,
//     name: 'Master Mechanics',
//     location: 'Manama, Bahrain',
//     image: '/public/workshop2.jpg',
//     rating: 4.4,
//     price: 52,
//     category: 'Specialty Repair',
//     availability: 'Weekends',
//   },
//   {
//     id: 9,
//     name: 'Precision Auto',
//     location: 'Jeddah, Saudi Arabia',
//     image: '/public/workshop1.jpg',
//     rating: 4.9,
//     price: 70,
//     category: 'Premium Service',
//     availability: 'All Week',
//   },
//   {
//     id: 10,
//     name: 'Auto Care Plus',
//     location: 'Muscat, Oman',
//     image: '/public/workshop2.jpg',
//     rating: 4.1,
//     price: 42,
//     category: 'Basic Service',
//     availability: 'Weekdays',
//   },
//   {
//     id: 11,
//     name: 'Car Doctor',
//     location: 'Dubai, UAE',
//     image: '/public/workshop1.jpg',
//     rating: 4.7,
//     price: 58,
//     category: 'Diagnostics',
//     availability: 'All Week',
//   },
//   {
//     id: 12,
//     name: 'Wheel & Deal',
//     location: 'Abu Dhabi, UAE',
//     image: '/public/workshop2.jpg',
//     rating: 4.5,
//     price: 53,
//     category: 'Tire Service',
//     availability: 'Weekdays',
//   },
// ];

// const availabilities = [
//   'Any Availability',
//   'Weekdays',
//   'Weekends',
//   'All Week',
// ];

// const locations = [
//   'All Locations',
//   'Muscat, Oman',
//   'Dubai, UAE',
//   'Abu Dhabi, UAE',
//   'Riyadh, Saudi Arabia',
//   'Jeddah, Saudi Arabia',
//   'Doha, Qatar',
//   'Kuwait City, Kuwait',
//   'Manama, Bahrain',
// ];

// const AllWorkshops = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filters, setFilters] = useState({
//     category: 'All Categories',
//     location: 'All Locations',
//     availability: 'Any Availability',
//     priceRange: [0, 100],
//     rating: 0,
//   });
//   const [filteredWorkshops, setFilteredWorkshops] = useState([...mockWorkshops]);
//   const workshopsPerPage = 8;

//   // Apply filters and search
//   useEffect(() => {
//     let result = [...mockWorkshops];

//     // Apply search
//     if (searchTerm) {
//       result = result.filter(workshop =>
//         workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         workshop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         workshop.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Apply category filter
//     if (filters.category !== 'All Categories') {
//       result = result.filter(workshop => workshop.category === filters.category);
//     }

//     // Apply location filter
//     if (filters.location !== 'All Locations') {
//       result = result.filter(workshop => workshop.location === filters.location);
//     }

//     // Apply availability filter
//     if (filters.availability !== 'Any Availability') {
//       result = result.filter(workshop => workshop.availability === filters.availability);
//     }

//     // Apply price range filter
//     result = result.filter(workshop =>
//       workshop.price >= filters.priceRange[0] && workshop.price <= filters.priceRange[1]
//     );

//     // Apply rating filter
//     if (filters.rating > 0) {
//       result = result.filter(workshop => workshop.rating >= filters.rating);
//     }

//     setFilteredWorkshops(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [searchTerm, filters]);

//   // Calculate pagination
//   const indexOfLastWorkshop = currentPage * workshopsPerPage;
//   const indexOfFirstWorkshop = indexOfLastWorkshop - workshopsPerPage;
//   const currentWorkshops = filteredWorkshops.slice(indexOfFirstWorkshop, indexOfLastWorkshop);
//   const totalPages = Math.ceil(filteredWorkshops.length / workshopsPerPage);

//   // Handle page change
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo(0, 0);
//   };

//   // Handle filter changes
//   const handleFilterChange = (key: string, value: any) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   // Generate pagination items
//   const renderPaginationItems = () => {
//     const items = [];

//     // Previous button
//     items.push(
//       <PaginationItem key="prev">
//         <PaginationPrevious
//           onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
//           className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
//         />
//       </PaginationItem>
//     );

//     // First page
//     items.push(
//       <PaginationItem key={1}>
//         <PaginationLink
//           onClick={() => handlePageChange(1)}
//           isActive={currentPage === 1}
//         >
//           1
//         </PaginationLink>
//       </PaginationItem>
//     );

//     // Ellipsis after first page
//     if (currentPage > 3) {
//       items.push(
//         <PaginationItem key="ellipsis1">
//           <PaginationEllipsis />
//         </PaginationItem>
//       );
//     }

//     // Pages around current page
//     for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
//       if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown
//       items.push(
//         <PaginationItem key={i}>
//           <PaginationLink
//             onClick={() => handlePageChange(i)}
//             isActive={currentPage === i}
//           >
//             {i}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     // Ellipsis before last page
//     if (currentPage < totalPages - 2) {
//       items.push(
//         <PaginationItem key="ellipsis2">
//           <PaginationEllipsis />
//         </PaginationItem>
//       );
//     }

//     // Last page (if there is more than one page)
//     if (totalPages > 1) {
//       items.push(
//         <PaginationItem key={totalPages}>
//           <PaginationLink
//             onClick={() => handlePageChange(totalPages)}
//             isActive={currentPage === totalPages}
//           >
//             {totalPages}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     // Next button
//     items.push(
//       <PaginationItem key="next">
//         <PaginationNext
//           onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
//           className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
//         />
//       </PaginationItem>
//     );

//     return items;
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//     <br />
//       {/* Search and Filter Bar */}
//       <div className="container mx-auto px-4 mb-6">
//         <div className="flex items-center gap-2">
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="outline" size="icon" className="h-10 w-10">
//                 <Filter className="h-4 w-4" />
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle>Filter Workshops</DialogTitle>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
                
//                 <CategoryFilter filters={filters} handleFilterChange={handleFilterChange} />

//                 {/* Location Filter */}
//                 <div className="space-y-2">
//                   <h3 className="font-medium">Location</h3>
//                   <RadioGroup
//                     value={filters.location}
//                     onValueChange={(value) => handleFilterChange('location', value)}
//                     className="flex flex-col gap-2"
//                   >
//                     {locations.map((location) => (
//                       <div key={location} className="flex items-center space-x-2">
//                         <RadioGroupItem value={location} id={`location-${location}`} />
//                         <Label htmlFor={`location-${location}`}>{location}</Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>

//                 {/* Availability Filter */}
//                 <div className="space-y-2">
//                   <h3 className="font-medium">Availability</h3>
//                   <RadioGroup
//                     value={filters.availability}
//                     onValueChange={(value) => handleFilterChange('availability', value)}
//                     className="flex flex-col gap-2"
//                   >
//                     {availabilities.map((availability) => (
//                       <div key={availability} className="flex items-center space-x-2">
//                         <RadioGroupItem value={availability} id={`availability-${availability}`} />
//                         <Label htmlFor={`availability-${availability}`}>{availability}</Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>

//                 {/* Price Range Filter */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <h3 className="font-medium">Price Range</h3>
//                     <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
//                   </div>
//                   <Slider
//                     value={filters.priceRange}
//                     min={0}
//                     max={100}
//                     step={5}
//                     onValueChange={(value) => handleFilterChange('priceRange', value)}
//                   />
//                 </div>

//                 {/* Rating Filter */}
//                 <div className="space-y-2">
//                   <h3 className="font-medium">Minimum Rating</h3>
//                   <RadioGroup
//                     value={String(filters.rating)}
//                     onValueChange={(value) => handleFilterChange('rating', Number(value))}
//                     className="flex flex-col gap-2"
//                   >
//                     {[0, 3, 3.5, 4, 4.5].map((rating) => (
//                       <div key={rating} className="flex items-center space-x-2">
//                         <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
//                         <Label htmlFor={`rating-${rating}`}>
//                           {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
//                         </Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               </div>
//               <div className="flex justify-between">
//                 <Button
//                   variant="outline"
//                   onClick={() => setFilters({
//                     category: 'All Categories',
//                     location: 'All Locations',
//                     availability: 'Any Availability',
//                     priceRange: [0, 100],
//                     rating: 0
//                   })}
//                 >
//                   Reset
//                 </Button>
//                 <Button type="submit">Apply Filters</Button>
//               </div>
//             </DialogContent>
//           </Dialog>

//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search"
//               className="pl-10"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Quick Filters Dropdown */}
//           {/* <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline">Quick Filters</Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Filter By</DropdownMenuLabel>

//               <DropdownMenuSeparator />
//               <DropdownMenuLabel>Category</DropdownMenuLabel>
//               {categories.slice(0, 5).map((category) => (
//                 <DropdownMenuItem
//                   key={category}
//                   onClick={() => handleFilterChange('category', category)}
//                 >
//                   {category}
//                 </DropdownMenuItem>
//               ))}

//               <DropdownMenuSeparator />
//               <DropdownMenuLabel>Location</DropdownMenuLabel>
//               {locations.slice(0, 5).map((location) => (
//                 <DropdownMenuItem
//                   key={location}
//                   onClick={() => handleFilterChange('location', location)}
//                 >
//                   {location}
//                 </DropdownMenuItem>
//               ))}

//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => handleFilterChange('rating', 4)}>
//                 4+ Star Rating
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu> */}
//         </div>
//       </div>

//       {/* Workshop Grid */}
//       <div className="container mx-auto px-4 mb-8">
//         {filteredWorkshops.length === 0 ? (
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-semibold">No workshops found</h2>
//             <p className="text-muted-foreground mt-2">Try adjusting your filters or search term</p>
//             <Button
//               variant="outline"
//               className="mt-4"
//               onClick={() => {
//                 setSearchTerm('');
//                 setFilters({
//                   category: 'All Categories',
//                   location: 'All Locations',
//                   availability: 'Any Availability',
//                   priceRange: [0, 100],
//                   rating: 0
//                 });
//               }}
//             >
//               Reset All Filters
//             </Button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {currentWorkshops.map((workshop) => (
//               <WorkshopCard workshop={workshop} />
//               // <Card key={workshop.id} className="overflow-hidden">
//               //   <div className="relative">
//               //     <img
//               //       src={workshop.image}
//               //       alt={workshop.name}
//               //       className="w-full h-48 object-cover"
//               //     />
//               //     <button className="absolute bottom-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white">
//               //       <Star className="h-5 w-5 text-yellow-400" />
//               //     </button>
//               //   </div>
//               //   <CardContent className="bg-yellow-400 p-4">
//               //     <h3 className="text-lg font-semibold">{workshop.name}</h3>
//               //     <p className="text-sm">{workshop.location}</p>
//               //   </CardContent>
//               // </Card>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {filteredWorkshops.length > 0 && (
//         <div className="container mx-auto px-4 py-6">
//           <Pagination>
//             <PaginationContent>
//               {renderPaginationItems()}
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default AllWorkshops;
