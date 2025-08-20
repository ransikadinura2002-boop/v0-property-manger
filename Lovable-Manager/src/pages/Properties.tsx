import { Building2, Plus, Edit, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AddPropertyModal } from '@/components/modals/AddPropertyModal';
import { useState } from 'react';

const propertiesData = [
  { id: 1, name: 'Oak Street Apartments', address: '123 Oak Street', units: 12, occupied: 10, status: 'active', type: 'Apartment' },
  { id: 2, name: 'Pine Avenue House', address: '456 Pine Avenue', units: 1, occupied: 1, status: 'active', type: 'House' },
  { id: 3, name: 'Maple Drive Complex', address: '789 Maple Drive', units: 24, occupied: 22, status: 'active', type: 'Complex' },
  { id: 4, name: 'Cedar Lane Townhomes', address: '321 Cedar Lane', units: 8, occupied: 6, status: 'maintenance', type: 'Townhome' },
];

const Properties = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-success-light text-success border-success/20',
      maintenance: 'bg-warning-light text-warning border-warning/20',
      inactive: 'bg-muted text-muted-foreground border-border',
    } as const;

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
          <p className="text-muted-foreground">Manage your properties and their status</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={() => setAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          <span>Add Property</span>
        </Button>
      </div>

      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Input placeholder="Search properties..." className="w-64" />
            <select className="px-3 py-2 border border-input rounded-md bg-background">
              <option>All Types</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Complex</option>
              <option>Townhome</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Address</th>
                <th>Type</th>
                <th>Units</th>
                <th>Occupancy</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {propertiesData.map((property) => (
                <tr key={property.id}>
                  <td className="font-medium">{property.name}</td>
                  <td>{property.address}</td>
                  <td>{property.type}</td>
                  <td>{property.units}</td>
                  <td>
                    <span className="font-medium">{property.occupied}/{property.units}</span>
                    <span className="text-muted-foreground ml-1">
                      ({Math.round((property.occupied / property.units) * 100)}%)
                    </span>
                  </td>
                  <td>{getStatusBadge(property.status)}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddPropertyModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </div>
  );
};

export default Properties;