interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PlaceholderPage = ({ title, description, icon }: PlaceholderPageProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="dashboard-card">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 p-4 bg-muted rounded-full">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground max-w-md">
            This feature is currently under development. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;