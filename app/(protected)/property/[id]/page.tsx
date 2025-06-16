import { getPropertyById } from "@/lib/db/property";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyOverview from "@/components/property/property-detail-card";

export default async function PropertyDetailsPage({
  params: rawParams,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = await rawParams;
  const propertyId = params.id;
  const property = await getPropertyById(propertyId);
  return (
    <div className="flex flex-col gap-2 px-4 py-2 md:gap-2 md:py-4 lg:px-6">
      <div className="flex items-center gap-2 mb-2">
        <Link
          href="/property"
          className="text-muted-foreground hover:text-foreground text-md"
        >
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
          {/* <PropertyUnits propertyId={property.id} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
