import { AlertCircle, Plus, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const issuesData = [
  {
    id: 'ISS-001',
    title: 'Water leak in bathroom',
    property: 'Sunset Apartments 2A',
    description: 'Tenant reports water leaking from ceiling in bathroom area',
    reportedBy: 'Sarah Johnson',
    reportedDate: '2024-01-15',
    priority: 'high',
    status: 'open',
    images: 2
  },
  {
    id: 'ISS-002',
    title: 'Broken elevator',
    property: 'Downtown Lofts Building B',
    description: 'Elevator in building B is not working properly',
    reportedBy: 'Mike Chen',
    reportedDate: '2024-01-14',
    priority: 'high',
    status: 'assigned',
    images: 1
  },
  {
    id: 'ISS-003',
    title: 'Noisy neighbors',
    property: 'Garden View Condos 3C',
    description: 'Repeated noise complaints about upstairs neighbors',
    reportedBy: 'Emma Davis',
    reportedDate: '2024-01-13',
    priority: 'medium',
    status: 'in-progress',
    images: 0
  },
  {
    id: 'ISS-004',
    title: 'Parking space damage',
    property: 'Riverside Houses 12',
    description: 'Damage to assigned parking space concrete',
    reportedBy: 'Alex Rodriguez',
    reportedDate: '2024-01-12',
    priority: 'low',
    status: 'resolved',
    images: 3
  },
];

const Issues = () => {
  const [selectedIssue, setSelectedIssue] = useState<typeof issuesData[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-destructive text-destructive-foreground',
      assigned: 'bg-warning text-warning-foreground',
      'in-progress': 'bg-primary text-primary-foreground',
      resolved: 'bg-success text-success-foreground',
    } as const;

    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-muted'}>
        {status === 'in-progress' ? 'IN PROGRESS' : status.toUpperCase()}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-destructive',
      medium: 'text-warning',
      low: 'text-muted-foreground',
    } as const;
    return colors[priority as keyof typeof colors] || 'text-muted-foreground';
  };

  const filteredIssues = issuesData.filter(issue => {
    const matchesTab = activeTab === 'all' || issue.status === activeTab;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.property.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issue Resolution</h1>
          <p className="text-muted-foreground">Track and resolve tenant-reported issues and maintenance requests.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>

      {/* Search Bar */}
      <div className="dashboard-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reported Issues */}
        <div className="lg:col-span-2">
          <div className="dashboard-card">
            <div className="flex items-center space-x-2 mb-6">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Reported Issues</h2>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="assigned">Assigned</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedIssue?.id === issue.id ? 'bg-primary/5 border-primary/20' : 'border-border'
                      }`}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{issue.title}</h3>
                          <Badge variant="outline" className={`${getPriorityColor(issue.priority)} border-current`}>
                            {issue.priority}
                          </Badge>
                        </div>
                        {getStatusBadge(issue.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{issue.property}</p>
                      <p className="text-sm mb-2">{issue.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>By {issue.reportedBy}</span>
                        <span>{issue.reportedDate}</span>
                        {issue.images > 0 && <span>{issue.images} images</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Issue Details Panel */}
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold mb-4">Issue Details</h3>
          {selectedIssue ? (
            <div className="space-y-4">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Select an issue to view details</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Select an issue to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Issues;