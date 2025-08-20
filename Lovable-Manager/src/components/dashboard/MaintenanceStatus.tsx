import { Wrench, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const maintenanceData = [
  { 
    id: 'MR-001', 
    property: 'Oak Street Apt 2A', 
    issue: 'Leaky faucet in kitchen', 
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Mike\'s Plumbing',
    dueDate: '2024-01-18'
  },
  { 
    id: 'MR-002', 
    property: 'Pine Avenue House', 
    issue: 'HVAC system maintenance', 
    status: 'completed',
    priority: 'high',
    assignedTo: 'CoolAir Services',
    dueDate: '2024-01-15'
  },
  { 
    id: 'MR-003', 
    property: 'Maple Drive Apt 1B', 
    issue: 'Paint touch-up in bedroom', 
    status: 'pending',
    priority: 'low',
    assignedTo: 'Unassigned',
    dueDate: '2024-01-25'
  },
  { 
    id: 'MR-004', 
    property: 'Cedar Lane House', 
    issue: 'Broken garage door', 
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'Garage Fix Pro',
    dueDate: '2024-01-20'
  },
];

export const MaintenanceStatus = () => {
  const getStatusInfo = (status: string) => {
    const statusMap = {
      'pending': { 
        icon: Clock, 
        className: 'bg-warning-light text-warning border-warning/20',
        iconClass: 'text-warning'
      },
      'in-progress': { 
        icon: Wrench, 
        className: 'bg-primary-light text-primary border-primary/20',
        iconClass: 'text-primary'
      },
      'completed': { 
        icon: CheckCircle, 
        className: 'bg-success-light text-success border-success/20',
        iconClass: 'text-success'
      },
    } as const;

    return statusMap[status as keyof typeof statusMap];
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-destructive-light text-destructive border-destructive/20',
      medium: 'bg-warning-light text-warning border-warning/20',
      low: 'bg-muted text-muted-foreground border-border',
    } as const;

    return (
      <Badge variant="outline" className={variants[priority as keyof typeof variants]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wrench className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Maintenance Status</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary-hover">View All</button>
      </div>
      
      <div className="space-y-4">
        {maintenanceData.map((item) => {
          const statusInfo = getStatusInfo(item.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <div key={item.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full bg-primary/10 ${statusInfo.iconClass}`}>
                  <StatusIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.issue}</p>
                  <p className="text-sm text-muted-foreground">{item.property} • {item.id}</p>
                  <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <Badge variant="outline" className={statusInfo.className}>
                  {item.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                {getPriorityBadge(item.priority)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};