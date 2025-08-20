import { Users, Plus, Edit, Eye, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddTenantModal } from '@/components/modals/AddTenantModal';
import { useState } from 'react';

const tenantsData = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    email: 'sarah.j@email.com', 
    phone: '(555) 123-4567',
    property: 'Oak Street Apt 2A',
    leaseStart: '2023-06-01',
    leaseEnd: '2024-05-31',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Mike Chen', 
    email: 'mike.chen@email.com', 
    phone: '(555) 234-5678',
    property: 'Pine Avenue House',
    leaseStart: '2023-09-01',
    leaseEnd: '2024-08-31',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Emily Davis', 
    email: 'emily.davis@email.com', 
    phone: '(555) 345-6789',
    property: 'Maple Drive Apt 1B',
    leaseStart: '2023-03-15',
    leaseEnd: '2024-03-14',
    status: 'pending'
  },
];

const Tenants = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-success-light text-success border-success/20',
      pending: 'bg-warning-light text-warning border-warning/20',
      vacated: 'bg-muted text-muted-foreground border-border',
    } as const;

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const TenantTable = ({ data }: { data: typeof tenantsData }) => (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Property</th>
            <th>Lease Start</th>
            <th>Lease End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tenant) => (
            <tr key={tenant.id}>
              <td className="font-medium">{tenant.name}</td>
              <td>
                <div>
                  <div className="text-sm">{tenant.email}</div>
                  <div className="text-xs text-muted-foreground">{tenant.phone}</div>
                </div>
              </td>
              <td>{tenant.property}</td>
              <td>{tenant.leaseStart}</td>
              <td>{tenant.leaseEnd}</td>
              <td>{getStatusBadge(tenant.status)}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tenant Management</h1>
          <p className="text-muted-foreground">Manage tenant information and lease agreements</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={() => setAddModalOpen(true)}>
          <UserPlus className="h-4 w-4" />
          <span>Add Tenant</span>
        </Button>
      </div>

      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-6">
          <Input placeholder="Search tenants..." className="w-64" />
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active (2)</TabsTrigger>
            <TabsTrigger value="pending">Pending (1)</TabsTrigger>
            <TabsTrigger value="vacated">Vacated (0)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <TenantTable data={tenantsData.filter(t => t.status === 'active')} />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <TenantTable data={tenantsData.filter(t => t.status === 'pending')} />
          </TabsContent>
          
          <TabsContent value="vacated" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              No vacated tenants found
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AddTenantModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </div>
  );
};

export default Tenants;