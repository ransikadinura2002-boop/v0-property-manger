import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export const KpiCard = ({ title, value, change, changeType, icon: Icon, iconColor = 'text-primary' }: KpiCardProps) => {
  const changeColor = {
    increase: 'text-success',
    decrease: 'text-destructive',
    neutral: 'text-muted-foreground',
  }[changeType];

  return (
    <div className="kpi-card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          <p className={`text-xs ${changeColor} mt-1`}>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-primary-light ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};