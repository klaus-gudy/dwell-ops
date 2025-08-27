import { getMaintenanceRequests } from "@/lib/db/maintenance";
import { MaintenanceRequestsList } from "@/components/maintenance/maintenance-requests-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function MaintenancePage() {
  const maintenanceRequests = await getMaintenanceRequests();

  return (
    <div className="flex flex-col gap-6 px-4 py-2 md:gap-6 md:py-4 lg:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Maintenance Requests</h1>
          <p className="text-muted-foreground">
            Track and manage tenant maintenance requests
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Maintenance Requests List */}
      <MaintenanceRequestsList requests={maintenanceRequests} />
    </div>
  );
}