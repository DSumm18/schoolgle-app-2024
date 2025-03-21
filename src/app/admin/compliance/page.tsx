import { Shield } from "lucide-react";
import { HoldingPage } from "@/components/holding-page";

export default function CompliancePage() {
  return (
    <HoldingPage
      title="Compliance"
      description="Tools for managing regulatory requirements and school policies. Launching Q3 2024"
      icon={<Shield className="h-8 w-8 text-amber-600" />}
      comingSoon={true}
      features={[
        "Policy management and version control",
        "Regulatory requirement tracking",
        "Compliance audit preparation tools",
        "Staff training and certification tracking",
        "Risk management and assessment",
        "Incident reporting and investigation",
        "Document management with approval workflows",
        "Automated compliance reminders and calendars"
      ]}
    />
  );
}