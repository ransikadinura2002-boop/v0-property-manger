import { Wrench, Plus, CheckCircle, Clock, AlertTriangle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const maintenanceRequests = [
  {
    id: 'MNT-001',
    property: 'Sunset Apartments 2A',
    issue: 'Leaking faucet in kitchen',
    date: '2024-01-15',
    provider: 'ABC Plumbing',
    quotation: '$150',
    status: 'quoted',
    priority: 'high'
  },
  {
    id: 'MNT-002',
    property: 'Downtown Lofts 5B',
    issue: 'AC unit not cooling properly',
    date: '2024-01-14',
    provider: 'Cool Air Services',
    quotation: '$320',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: 'MNT-003',
    property: 'Garden View Condos 3C',
    issue: 'Broken window latch',
    date: '2024-01-13',
    provider: 'Fix-It Pros',
    quotation: '$85',
    status: 'approved',
    priority: 'low'
  },
];

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    const variants = {
      'requested': 'bg-muted text-muted-foreground',
      'quoted': 'bg-warning text-warning-foreground',
      'approved': 'bg-primary text-primary-foreground',
      'completed': 'bg-success text-success-foreground',
    } as const;

    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-muted'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    const matchesSearch = request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.issue.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const quotedRequests = maintenanceRequests.filter(request => request.status === 'quoted');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maintenance Tracking</h1>
          <p className="text-muted-foreground">Track maintenance requests, quotations, and service completion status.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Search Bar */}
      <div className="dashboard-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search maintenance requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Maintenance Requests with Tabs */}
      <div className="dashboard-card">
        <div className="flex items-center space-x-2 mb-6">
          <Wrench className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Maintenance Requests</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="requested">Requested</TabsTrigger>
            <TabsTrigger value="quoted">Quoted</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">REQUEST ID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">PROPERTY</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">ISSUE</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">DATE</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">PROVIDER</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">QUOTATION</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">STATUS</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium">{request.id}</td>
                      <td className="py-4 px-4">{request.property}</td>
                      <td className="py-4 px-4">{request.issue}</td>
                      <td className="py-4 px-4">{request.date}</td>
                      <td className="py-4 px-4">{request.provider}</td>
                      <td className="py-4 px-4 font-semibold text-primary">{request.quotation}</td>
                      <td className="py-4 px-4">{getStatusBadge(request.status)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {request.status === 'quoted' && (
                            <Button size="sm" className="bg-success hover:bg-success/90 text-white">
                              Approve
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            View
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

      {/* Pending Quotation Approvals */}
      <div className="dashboard-card">
        <h3 className="text-lg font-semibold mb-4">Pending Quotation Approvals</h3>
        <div className="space-y-4">
          {quotedRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{request.id}</h4>
                  <p className="text-sm text-muted-foreground">{request.property}</p>
                  <p className="text-sm">{request.issue}</p>
                  <p className="text-lg font-semibold text-primary mt-1">{request.quotation}</p>
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-success hover:bg-success/90 text-white">
                    Approve Quote
                  </Button>
                  <Button variant="outline">
                    Request Revision
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maintenance;