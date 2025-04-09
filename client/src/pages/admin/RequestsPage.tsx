import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent
} from '../../components/ui/Card';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../components/ui/Dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';
import { Separator } from '../../components/ui/Separator';
import { Search, AlertCircle, Car, Wrench, MapPin, Calendar, CreditCard, User, Building, Trash } from 'lucide-react';
import { format } from 'date-fns';

// Types
export interface IRequestEntity {
  id: string;
  requestId: string;
  name: string;
  mobile: string;
  vehicleNo: string;
  carType: string;
  carBrand: string;
  location: string;
  type: "car-lift" | "mobile-workshop";
  status: "submitted" | "pending" | "on_way" | "in_progress" | "completed" | "delivered" | "accepted" | "rejected";
  paymentStatus: "pending" | "completed";
  workshopId: string;
  customerId: string;
  image?: string;
  amount: number;
  gst: number;
  description?: string;
  notes?: string;
  createdAt: Date;
  updatesAt: Date;
}

interface ICustomer {
  id: string;
  name: string;
  phone: string;
}

interface IWorkshop {
  id: string;
  name: string;
  phone: string;
}

interface IRequestWithPopulated extends IRequestEntity {
  customer: ICustomer;
  workshop: IWorkshop;
}

const RequestsAdminHorizontalCards: React.FC = () => {
  const [requests, setRequests] = useState<IRequestWithPopulated[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<IRequestWithPopulated[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<IRequestWithPopulated | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  // Status colors
  const statusColors = {
    submitted: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    on_way: "bg-purple-100 text-purple-800",
    in_progress: "bg-orange-100 text-orange-800",
    completed: "bg-green-100 text-green-800",
    delivered: "bg-emerald-100 text-emerald-800",
    accepted: "bg-teal-100 text-teal-800",
    rejected: "bg-red-100 text-red-800"
  };

  // Payment status colors
  const paymentStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800"
  };

  // Mock data fetching
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // In a real application, this would be an API call
        // For this demo, we'll use dummy data
        const dummyData: IRequestWithPopulated[] = [
          {
            id: "req-001",
            requestId: "REQ00123",
            name: "Toyota Camry Service",
            mobile: "9876543210",
            vehicleNo: "KA01AB1234",
            carType: "Sedan",
            carBrand: "Toyota",
            location: "Bangalore, Karnataka",
            type: "mobile-workshop",
            status: "in_progress",
            paymentStatus: "pending",
            workshopId: "ws001",
            customerId: "cust001",
            amount: 2500,
            gst: 450,
            description: "Regular service and oil change",
            createdAt: new Date("2025-04-01T10:30:00"),
            updatesAt: new Date("2025-04-01T14:20:00"),
            customer: {
              id: "cust001",
              name: "John Doe",
              phone: "9876543210"
            },
            workshop: {
              id: "ws001",
              name: "Express Auto Care",
              phone: "8765432109"
            }
          },
          {
            id: "req-002",
            requestId: "REQ00124",
            name: "Honda City Repair",
            mobile: "8765432109",
            vehicleNo: "MH02CD5678",
            carType: "Sedan",
            carBrand: "Honda",
            location: "Mumbai, Maharashtra",
            type: "car-lift",
            status: "completed",
            paymentStatus: "completed",
            workshopId: "ws002",
            customerId: "cust002",
            image: "/car-image.jpg",
            amount: 5000,
            gst: 900,
            description: "Brake system replacement",
            notes: "Customer requested urgent service",
            createdAt: new Date("2025-03-28T09:15:00"),
            updatesAt: new Date("2025-03-29T16:45:00"),
            customer: {
              id: "cust002",
              name: "Jane Smith",
              phone: "8765432109"
            },
            workshop: {
              id: "ws002",
              name: "Premium Car Care",
              phone: "7654321098"
            }
          },
          {
            id: "req-003",
            requestId: "REQ00125",
            name: "BMW X5 Issue",
            mobile: "7654321098",
            vehicleNo: "DL03EF9012",
            carType: "SUV",
            carBrand: "BMW",
            location: "Delhi, NCR",
            type: "car-lift",
            status: "pending",
            paymentStatus: "pending",
            workshopId: "ws003",
            customerId: "cust003",
            amount: 15000,
            gst: 2700,
            description: "Engine check light on, unusual noise",
            createdAt: new Date("2025-04-05T11:00:00"),
            updatesAt: new Date("2025-04-05T11:30:00"),
            customer: {
              id: "cust003",
              name: "Robert Johnson",
              phone: "7654321098"
            },
            workshop: {
              id: "ws003",
              name: "Luxury Auto Workshop",
              phone: "6543210987"
            }
          },
          {
            id: "req-004",
            requestId: "REQ00126",
            name: "Maruti Swift Service",
            mobile: "6543210987",
            vehicleNo: "TN04GH3456",
            carType: "Hatchback",
            carBrand: "Maruti",
            location: "Chennai, Tamil Nadu",
            type: "mobile-workshop",
            status: "delivered",
            paymentStatus: "completed",
            workshopId: "ws001",
            customerId: "cust004",
            amount: 1800,
            gst: 324,
            description: "Routine maintenance and AC service",
            createdAt: new Date("2025-03-20T14:45:00"),
            updatesAt: new Date("2025-03-21T17:30:00"),
            customer: {
              id: "cust004",
              name: "Priya Sharma",
              phone: "6543210987"
            },
            workshop: {
              id: "ws001",
              name: "Express Auto Care",
              phone: "8765432109"
            }
          },
          {
            id: "req-005",
            requestId: "REQ00127",
            name: "Hyundai Creta Problem",
            mobile: "5432109876",
            vehicleNo: "KL05IJ7890",
            carType: "SUV",
            carBrand: "Hyundai",
            location: "Kochi, Kerala",
            type: "car-lift",
            status: "rejected",
            paymentStatus: "pending",
            workshopId: "ws002",
            customerId: "cust005",
            amount: 0,
            gst: 0,
            description: "Vehicle not starting, battery issue suspected",
            notes: "Workshop unavailable for this location",
            createdAt: new Date("2025-04-07T08:30:00"),
            updatesAt: new Date("2025-04-07T09:15:00"),
            customer: {
              id: "cust005",
              name: "Anil Kumar",
              phone: "5432109876"
            },
            workshop: {
              id: "ws002",
              name: "Premium Car Care",
              phone: "7654321098"
            }
          }
        ];
        
        setRequests(dummyData);
        setFilteredRequests(dummyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const requests1 = 

  // Apply filters and search
  useEffect(() => {
    let result = [...requests];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(request => 
        request.requestId.toLowerCase().includes(term) ||
        request.name.toLowerCase().includes(term) ||
        request.vehicleNo.toLowerCase().includes(term) ||
        request.customer.name.toLowerCase().includes(term) ||
        request.workshop.name.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(request => request.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(request => request.type === typeFilter);
    }

    // Apply payment filter
    if (paymentFilter !== 'all') {
      result = result.filter(request => request.paymentStatus === paymentFilter);
    }

    setFilteredRequests(result);
  }, [requests, searchTerm, statusFilter, typeFilter, paymentFilter]);

  const handleDelete = (request: IRequestWithPopulated) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRequest) {
      // In a real application, this would be an API call to delete the request
      const updatedRequests = requests.filter(req => req.id !== selectedRequest.id);
      setRequests(updatedRequests);
      setIsDeleteDialogOpen(false);
      setSelectedRequest(null);
      // Show a notification (toast) that would be implemented in a real app
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Service Requests</h1>
        <p className="text-gray-500">View all customer service requests</p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by ID, name, vehicle number..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="on_way">On Way</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="car-lift">Car Lift</SelectItem>
                  <SelectItem value="mobile-workshop">Mobile Workshop</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
                setPaymentFilter('all');
              }}>
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Count Display */}
      <div className="mb-4">
        <h2 className="text-lg font-medium">
          Showing {filteredRequests.length} of {requests.length} total requests
        </h2>
      </div>

      {/* Requests Horizontal Cards */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 text-center py-6">
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium">No requests found</h3>
            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Header with Request ID and Status */}
                <div className="bg-gray-50 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-bold text-lg">{request.requestId}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(request.createdAt), 'dd MMM yyyy, hh:mm a')}
                      </div>
                    </div>
                    <Badge className={`ml-2 ${statusColors[request.status]}`}>
                      {request.status.replace('_', ' ')}
                    </Badge>
                    <Badge className={`${paymentStatusColors[request.paymentStatus]}`}>
                      Payment: {request.paymentStatus}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {request.type === "car-lift" ? "Car Lift" : "Mobile Workshop"}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                    onClick={() => handleDelete(request)}
                  >
                    <Trash className="h-5 w-5" />
                  </Button>
                </div>

                {/* Main content grid */}
                <div className="p-4 grid grid-cols-12 gap-4">
                  {/* Customer Information */}
                  <div className="col-span-3">
                    <div className="flex items-start space-x-2">
                      <User className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">Customer</h4>
                        <p className="font-semibold">{request.customer.name}</p>
                        <p className="text-sm text-gray-600">{request.customer.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div className="col-span-3">
                    <div className="flex items-start space-x-2">
                      <Car className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">Vehicle</h4>
                        <p className="font-semibold">{request.carBrand} {request.carType}</p>
                        <p className="text-sm text-gray-600">{request.vehicleNo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Workshop Information */}
                  <div className="col-span-3">
                    <div className="flex items-start space-x-2">
                      <Building className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">Workshop</h4>
                        <p className="font-semibold">{request.workshop.name}</p>
                        <p className="text-sm text-gray-600">{request.workshop.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="col-span-3">
                    <div className="flex items-start space-x-2">
                      <CreditCard className="h-5 w-5 text-amber-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-700">Payment</h4>
                        <p className="font-semibold">₹{(request.amount + request.gst).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          Base: ₹{request.amount.toLocaleString()} | GST: ₹{request.gst.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Location and Description */}
                <div className="p-4 grid grid-cols-12 gap-4">
                  {/* Location */}
                  <div className="col-span-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-700">Location</h4>
                        <p className="text-sm">{request.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="col-span-8">
                    <div className="flex items-start space-x-2">
                      <Wrench className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-700">Service Details</h4>
                        <p className="text-sm">{request.description || 'No description provided'}</p>
                        {request.notes && (
                          <div className="mt-2 bg-amber-50 p-2 rounded text-sm border border-amber-200">
                            <span className="font-medium">Note:</span> {request.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedRequest && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete request {selectedRequest.requestId}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RequestsAdminHorizontalCards;