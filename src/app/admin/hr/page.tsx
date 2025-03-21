import { Users } from "lucide-react";
import { HoldingPage } from "@/components/holding-page";

export default function HRPage() {
  return (
    <HoldingPage
      title="Human Resources"
      description="Tools for managing staff, recruitment, training, and performance. Launching Q2 2024"
      icon={<Users className="h-8 w-8 text-blue-600" />}
      comingSoon={true}
      features={[
        "Staff directory and profile management",
        "Recruitment and onboarding workflows",
        "Performance management and reviews",
        "Training and professional development tracking",
        "Leave management and absence tracking",
        "Contract management",
        "Staff certifications and qualifications",
        "Employee wellness programs"
      ]}
    />
  );
}