import { FileText, Plus, Eye, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const leaseAgreementsData = [
  {
    id: 'AGR-001',
    tenant: 'Sarah Johnson',
    property: 'Sunset Apartments 2A',
    leasePeriod: '2023-06-01 to 2024-05-31',
    rent: '$1,250',
    status: 'validated'
  },
  {
    id: 'AGR-002',
    tenant: 'Mike Chen',
    property: 'Downtown Lofts 5B',
    leasePeriod: '2023-09-15 to 2024-09-14',
    rent: '$1,800',
    status: 'pending-review'
  },
  {
    id: 'AGR-003',
    tenant: 'Emma Davis',
    property: 'Riverside Houses 12',
    leasePeriod: '2023-03-01 to 2024-02-29',
    rent: '$2,200',
    status: 'validated'
  },
  {
    id: 'AGR-004',
    tenant: 'Alex Rodriguez',
    property: 'Garden View Condos 3C',
    leasePeriod: '2024-01-15 to 2025-01-14',
    rent: '$1,300',
    status: 'rejected'
  },
];

const LeaseAgreements = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgreement, setSelectedAgreement] = useState<typeof leaseAgreementsData[0] | null>(null);

  const getStatusBadge = (status: string) => {
    const variants = {
      'validated': 'bg-success text-success-foreground',
      'pending-review': 'bg-warning text-warning-foreground',
      'rejected': 'bg-destructive text-destructive-foreground',
    } as const;

    const labels = {
      'validated': 'Validated',
      'pending-review': 'Pending Review',
      'rejected': 'Rejected',
    } as const;

    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-muted'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const filteredAgreements = leaseAgreementsData.filter(agreement => {
    const matchesTab = activeTab === 'all' || agreement.status === activeTab;
    const matchesSearch = agreement.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agreement.property.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lease Agreement Verification</h1>
          <p className="text-muted-foreground">Review, validate, and manage rental agreements and lease documentation.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Agreement
        </Button>
      </div>

      {/* Search Bar */}
      <div className="dashboard-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search agreements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lease Agreements Table */}
        <div className="lg:col-span-2">
          <div className="dashboard-card">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Lease Agreements</h2>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending-review">Pending</TabsTrigger>
                <TabsTrigger value="validated">Validated</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">AGREEMENT ID</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">TENANT</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">PROPERTY</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">LEASE PERIOD</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">RENT</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">STATUS</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAgreements.map((agreement) => (
                        <tr 
                          key={agreement.id} 
                          className={`border-b hover:bg-muted/50 cursor-pointer ${
                            selectedAgreement?.id === agreement.id ? 'bg-primary/5' : ''
                          }`}
                          onClick={() => setSelectedAgreement(agreement)}
                        >
                          <td className="py-4 px-4 font-medium">{agreement.id}</td>
                          <td className="py-4 px-4">{agreement.tenant}</td>
                          <td className="py-4 px-4">{agreement.property}</td>
                          <td className="py-4 px-4 text-sm">{agreement.leasePeriod}</td>
                          <td className="py-4 px-4 font-semibold text-primary">{agreement.rent}</td>
                          <td className="py-4 px-4">{getStatusBadge(agreement.status)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Agreement Details Panel */}
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Agreement Details</h3>
          {selectedAgreement ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedAgreement.id}</h4>
                <p className="text-sm text-muted-foreground">{selectedAgreement.property}</p>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Tenant:</span>
                  <p className="font-medium">{selectedAgreement.tenant}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Lease Period:</span>
                  <p className="font-medium">{selectedAgreement.leasePeriod}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Monthly Rent:</span>
                  <p className="font-medium text-primary">{selectedAgreement.rent}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <div className="mt-1">{getStatusBadge(selectedAgreement.status)}</div>
                </div>
              </div>

              {selectedAgreement.status === 'pending-review' && (
                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full bg-success hover:bg-success/90 text-white">
                    Approve Agreement
                  </Button>
                  <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/5">
                    Reject Agreement
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Select an agreement to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaseAgreements;