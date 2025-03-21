import { BarChart3 } from "lucide-react";
import { HoldingPage } from "@/components/holding-page";

export default function MissionControlPage() {
  return (
    <HoldingPage
      title="Mission Control"
      description="Centralized dashboard for monitoring all aspects of school operations. Launching Q2 2024"
      icon={<BarChart3 className="h-8 w-8 text-indigo-600" />}
      comingSoon={true}
      features={[
        "Real-time performance metrics and KPIs",
        "Cross-module data visualization",
        "Alert system for critical issues",
        "Customizable dashboard widgets",
        "Strategic planning tools",
        "Trend analysis and forecasting",
        "Task prioritization and assignment",
        "Executive summary reporting"
      ]}
    />
  );
}