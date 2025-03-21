import { ReactNode } from 'react';

export interface HoldingPageProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  comingSoon?: boolean;
}

export function HoldingPage({ 
  title, 
  description, 
  icon,
  comingSoon = true 
}: HoldingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="mb-4">{icon}</div>}
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      )}
      {comingSoon && (
        <div className="mt-6 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          Coming Soon
        </div>
      )}
    </div>
  );
}