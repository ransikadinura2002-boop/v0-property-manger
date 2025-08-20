import { ClipboardCheck, Plus, Calendar, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const inspectionData = [
  {
    id: 'INS-001',
    property: 'Oak Street Apt 2A',
    type: 'Move-in',
    inspector: 'John Smith',
    scheduledDate: '2024-01-20',
    status: 'completed',
    score: '85%',
    issues: 2
  },
  {
    id: 'INS-002',
    property: 'Pine Avenue House',
    type: 'Annual',
    inspector: 'Sarah Wilson',
    scheduledDate: '2024-01-22',
    status: 'scheduled',
    score: null,
    issues: null
  },
  {
    id: 'INS-003',
    property: 'Maple Drive Apt 1B',
    type: 'Move-out',
    inspector: 'Mike Johnson',
    scheduledDate: '2024-01-18',
    status: 'in-progress',
    score: null,
    issues: 1
  },
];

const Inspections = () => {
  const [activeTab, setActiveTab] = useState('all-inspections');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = {
      'scheduled': 'bg-warning text-warning-foreground',
      'in-progress': 'bg-primary text-primary-foreground',
      'completed': 'bg-success text-success-foreground',
    } as const;

    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-muted'}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  const filteredInspections = inspectionData.filter(inspection => {
    const matchesSearch = inspection.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || inspection.type.toLowerCase() === typeFilter;
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pre-Inspection Reports</h1>
          <p className="text-muted-foreground">Manage inspection checklists and reports</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Inspection
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all-inspections">All Inspections</TabsTrigger>
          <TabsTrigger value="new-inspection">New Inspection</TabsTrigger>
        </TabsList>

        <TabsContent value="all-inspections" className="space-y-6">
          {/* Search and Filters */}
          <div className="dashboard-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search inspections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="move-in">Move-in</SelectItem>
                  <SelectItem value="move-out">Move-out</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Inspections Table */}
          <div className="dashboard-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">INSPECTION ID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">PROPERTY</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">TYPE</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">INSPECTOR</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">SCHEDULED DATE</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">STATUS</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">SCORE</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">ISSUES</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInspections.map((inspection) => (
                    <tr key={inspection.id} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium">{inspection.id}</td>
                      <td className="py-4 px-4">{inspection.property}</td>
                      <td className="py-4 px-4">{inspection.type}</td>
                      <td className="py-4 px-4">{inspection.inspector}</td>
                      <td className="py-4 px-4">{inspection.scheduledDate}</td>
                      <td className="py-4 px-4">{getStatusBadge(inspection.status)}</td>
                      <td className="py-4 px-4">
                        {inspection.score ? (
                          <span className="font-semibold text-success">{inspection.score}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {inspection.issues !== null ? (
                          <Badge variant="outline" className="bg-warning text-warning-foreground">
                            {inspection.issues}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Report
                          </Button>
                          {inspection.status === 'scheduled' && (
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                              Start
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="new-inspection" className="space-y-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-semibold mb-4">Schedule New Inspection</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Property</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oak-street">Oak Street Apt 2A</SelectItem>
                    <SelectItem value="pine-avenue">Pine Avenue House</SelectItem>
                    <SelectItem value="maple-drive">Maple Drive Apt 1B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Inspection Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="move-in">Move-in</SelectItem>
                    <SelectItem value="move-out">Move-out</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Inspector</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inspector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith</SelectItem>
                    <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Scheduled Date</label>
                <Input type="date" />
              </div>
            </div>
            <div className="mt-6">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Inspection
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inspections;