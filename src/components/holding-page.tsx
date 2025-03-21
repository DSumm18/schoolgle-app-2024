"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Rocket } from "lucide-react";
import { ReactNode } from "react";

interface HoldingPageProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  features?: string[];
  comingSoon?: boolean;
}

export function HoldingPage({
  title,
  description,
  icon,
  features = [],
  comingSoon = true,
}: HoldingPageProps) {
  return (
    <div className="h-[500px] flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
      <div className="text-center p-6">
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        <h3 className="text-xl font-medium mb-3">{title}</h3>
        {description && (
          <p className="text-muted-foreground max-w-md mx-auto mb-4">
            {description}
          </p>
        )}
        {comingSoon && (
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );
}