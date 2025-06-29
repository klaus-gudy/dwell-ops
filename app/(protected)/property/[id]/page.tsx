import { getPropertyById, getPropertyDashboardMetrics, getUnitsByPropertyId } from "@/lib/db/property";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyOverview from "@/components/property/property-detail-card";
import PropertyUnit from "@/components/property/property-unit";
import { ArrowLeft } from "lucide-react";

export default async function PropertyDetailsPage({
  params: rawParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = await rawParams;
  const propertyId = params.id;
  const property = await getPropertyById(propertyId);
  const units = await getUnitsByPropertyId(propertyId);
  const metrics = await getPropertyDashboardMetrics(propertyId);
  return (
    <div className="container px-6 py-2 mx-auto max-w-7xl">
      <div className="flex items-center gap-2 mb-2">
        <Link
          href="/property"
          className="flex items-center text-muted-foreground hover:text-foreground text-md"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Property
        </Link>
        <span className="text-muted-foreground text-md">/</span>
        <span>{property.name}</span>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <PropertyOverview property={property} />
        </TabsContent>

        <TabsContent value="units" className="mt-6">
          <PropertyUnit units={units} propertyId={propertyId} metrics={metrics}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
