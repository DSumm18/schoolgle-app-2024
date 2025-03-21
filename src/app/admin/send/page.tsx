import { BookOpen } from "lucide-react";
import { HoldingPage } from "@/components/holding-page";

export default function SENDPage() {
  return (
    <HoldingPage
      title="SEND"
      description="Special Educational Needs and Disabilities management tools. Launching Q4 2024"
      icon={<BookOpen className="h-8 w-8 text-purple-600" />}
      comingSoon={true}
      features={[
        "Student IEP (Individual Education Plan) management",
        "SEND register and documentation",
        "Intervention tracking and outcomes",
        "Resource allocation for SEND support",
        "Progress monitoring and reporting",
        "Parent/guardian communication portal",
        "External agency collaboration tools",
        "Accessibility features and accommodations tracking"
      ]}
    />
  );
}