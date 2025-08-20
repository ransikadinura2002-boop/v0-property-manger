import { Plus, Star, Phone, Mail, MapPin, Search, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const serviceProvidersData = [
  {
    id: 1,
    name: 'ABC Plumbing Services',
    specialty: 'Plumbing',
    phone: '(555) 123-4567',
    email: 'contact@abcplumbing.com',
    address: '123 Service St, City',
    rating: 4.8,
    reviews: 124,
    completedJobs: 45,
    status: 'active',
    availability: 'Available'
  },
  {
    id: 2,
    name: 'Cool Air HVAC',
    specialty: 'HVAC',
    phone: '(555) 234-5678',
    email: 'info@coolair.com',
    address: '456 Climate Ave, City',
    rating: 4.6,
    reviews: 89,
    completedJobs: 32,
    status: 'active',
    availability: 'Available'
  },
  {
    id: 3,
    name: 'ElectricPro Solutions',
    specialty: 'Electrical',
    phone: '(555) 345-6789',
    email: 'hello@electricpro.com',
    address: '789 Power Ln, City',
    rating: 4.9,
    reviews: 156,
    completedJobs: 67,
    status: 'active',
    availability: 'Available'
  },
  {
    id: 4,
    name: 'Fix-It Maintenance',
    specialty: 'General',
    phone: '(555) 456-7890',
    email: 'support@fixit.com',
    address: '321 Repair Rd, City',
    rating: 4.3,
    reviews: 73,
    completedJobs: 28,
    status: 'inactive',
    availability: 'Inactive'
  },
];

const ServiceProviders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge variant="outline">Inactive</Badge>
    );
  };

  const filteredProviders = serviceProvidersData.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Service Provider Assignment</h1>
          <p className="text-muted-foreground">Manage service providers and assign them to maintenance requests.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </div>

      {/* Search Bar */}
      <div className="dashboard-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Service Provider Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <div key={provider.id} className="dashboard-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{provider.specialty}</p>
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(provider.rating)}
                  <span className="text-sm text-muted-foreground">
                    {provider.rating} ({provider.reviews} reviews)
                  </span>
                </div>
              </div>
              {getStatusBadge(provider.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{provider.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{provider.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{provider.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm">
                <strong>Completed Jobs:</strong> {provider.completedJobs}
              </span>
              <Badge variant="outline" className="bg-success-light text-success">
                {provider.availability}
              </Badge>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                View Profile
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white">
                <UserCheck className="h-4 w-4 mr-1" />
                Assign
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Status Update */}
      <div className="dashboard-card">
        <h3 className="text-lg font-semibold mb-4">Manual Status Update</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Maintenance Request ID</label>
            <Select value={selectedRequest} onValueChange={setSelectedRequest}>
              <SelectTrigger>
                <SelectValue placeholder="Select Request" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MNT-001">MNT-001</SelectItem>
                <SelectItem value="MNT-002">MNT-002</SelectItem>
                <SelectItem value="MNT-003">MNT-003</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Status</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="requested">Requested</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;