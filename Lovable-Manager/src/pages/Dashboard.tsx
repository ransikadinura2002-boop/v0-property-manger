import { Building2, Users, DollarSign, TrendingDown } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { PaymentHistory } from '@/components/dashboard/PaymentHistory';
import { MaintenanceStatus } from '@/components/dashboard/MaintenanceStatus';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your properties.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Properties"
          value="24"
          change="+2 this month"
          changeType="increase"
          icon={Building2}
        />
        <KpiCard
          title="Total Units"
          value="156"
          change="+8 this month"
          changeType="increase"
          icon={Building2}
          iconColor="text-success"
        />
        <KpiCard
          title="Total Income"
          value="$184,250"
          change="+12.5% from last month"
          changeType="increase"
          icon={DollarSign}
          iconColor="text-success"
        />
        <KpiCard
          title="Total Expenses"
          value="$42,180"
          change="-3.2% from last month"
          changeType="decrease"
          icon={TrendingDown}
          iconColor="text-warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentHistory />
        <MaintenanceStatus />
      </div>
    </div>
  );
};

export default Dashboard;