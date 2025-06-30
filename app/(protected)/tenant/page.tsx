import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getAllTenantsWithLeaseStatus } from "@/lib/db/tenant";

export default async function TenantsPage() {
  const tenants = await getAllTenantsWithLeaseStatus();
    return (
      <div className="flex flex-col gap-2 px-4 py-2 md:gap-2 md:py-4 lg:px-6">
        <DataTable data={tenants} columns={columns} />
      </div>
    )
  }