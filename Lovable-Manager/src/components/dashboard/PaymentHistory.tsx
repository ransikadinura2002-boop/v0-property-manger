import { Badge } from '@/components/ui/badge';

const paymentData = [
  { id: 1, date: '2024-01-15', tenant: 'Sarah Johnson', property: 'Oak Street Apt 2A', amount: '$1,200', status: 'paid' },
  { id: 2, date: '2024-01-14', tenant: 'Mike Chen', property: 'Pine Avenue House', amount: '$2,500', status: 'paid' },
  { id: 3, date: '2024-01-12', tenant: 'Emily Davis', property: 'Maple Drive Apt 1B', amount: '$1,350', status: 'pending' },
  { id: 4, date: '2024-01-10', tenant: 'Robert Smith', property: 'Cedar Lane House', amount: '$1,800', status: 'overdue' },
  { id: 5, date: '2024-01-08', tenant: 'Lisa Brown', property: 'Elm Street Apt 3C', amount: '$1,150', status: 'paid' },
];

export const PaymentHistory = () => {
  const getStatusBadge = (status: string) => {
    const variants = {
      paid: 'bg-success-light text-success border-success/20',
      pending: 'bg-warning-light text-warning border-warning/20',
      overdue: 'bg-destructive-light text-destructive border-destructive/20',
    } as const;

    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Payments</h3>
        <button className="text-sm text-primary hover:text-primary-hover">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Tenant</th>
              <th>Property</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td className="font-medium">{payment.tenant}</td>
                <td>{payment.property}</td>
                <td className="font-semibold">{payment.amount}</td>
                <td>{getStatusBadge(payment.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};