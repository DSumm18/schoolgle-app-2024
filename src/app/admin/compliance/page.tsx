import { Shield } from "lucide-react";
import { HoldingPage } from "@/components/holding-page";

export default function CompliancePage() {
  return (
    <HoldingPage
      title="Compliance"
      description="Tools for managing regulatory requirements and school policies: Policy management, Regulatory tracking, Audit preparation, Training tracking, Risk management, Incident reporting, Document workflows, and Compliance calendars. Launching Q3 2024"
      icon={<Shield className="h-8 w-8 text-amber-600" />}
      comingSoon={true}
    />
  );
}