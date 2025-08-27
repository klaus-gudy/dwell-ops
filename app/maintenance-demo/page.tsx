import { MaintenanceRequestsList } from "@/components/maintenance/maintenance-requests-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { MaintenanceRequestSummary } from "@/types/maintenance";

// Mock data for demo
const mockMaintenanceRequests: MaintenanceRequestSummary[] = [
  {
    id: "1",
    type: "WATER_LEAKAGE",
    priority: "HIGH",
    status: "OPEN",
    title: "Kitchen faucet leaking",
    tenantName: "Fatuma Jabir",
    unitName: "Unit 102",
    propertyName: "Kachua Apartments",
    assignedTo: null,
    assignedUserName: null,
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2", 
    type: "ELECTRIC_SHORTAGE",
    priority: "URGENT",
    status: "IN_PROGRESS",
    title: "Power outage in bedroom",
    tenantName: "John Doe",
    unitName: "Unit 201",
    propertyName: "Sunset Apartments",
    assignedTo: "fundi-1",
    assignedUserName: "Ali Mwanga",
    createdAt: new Date("2025-01-14"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "3",
    type: "PLUMBING",
    priority: "MEDIUM", 
    status: "COMPLETED",
    title: "Toilet not flushing properly",
    tenantName: "Jane Smith",
    unitName: "Unit 105",
    propertyName: "Kachua Apartments",
    assignedTo: "fundi-2",
    assignedUserName: "Hassan Juma",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-12"),
  },
  {
    id: "4",
    type: "HVAC",
    priority: "LOW",
    status: "OPEN",
    title: "Air conditioning not cooling",
    tenantName: "Mary Johnson",
    unitName: "Unit 301",
    propertyName: "Sunset Apartments",
    assignedTo: null,
    assignedUserName: null,
    createdAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-12"),
  },
];

export default function MaintenanceDemoPage() {
  return (
    <div className="flex flex-col gap-6 px-4 py-2 md:gap-6 md:py-4 lg:px-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Maintenance Requests</h1>
          <p className="text-muted-foreground">
            Track and manage tenant maintenance requests (Demo Version)
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Maintenance Requests List */}
      <MaintenanceRequestsList requests={mockMaintenanceRequests} />
    </div>
  );
}