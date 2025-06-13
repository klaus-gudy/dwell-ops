import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { getProperties } from "@/lib/db/property";

export default async function PropertyPage() {
    const properties = await getProperties();
    return (
        <div className="flex flex-col gap-2 py-2 md:gap-2 md:py-4">
            <div className="flex items-center justify-end px-4 lg:px-6">
                {/* <h1 className="text-3xl font-bold">Properties</h1> */}
                <Button>
                    <Plus className="w-4 h-4 mr-2" /> Add property
                </Button>
            </div>

            {properties.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:px-6">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <div className="px-4 text-center text-gray-500 lg:px-6">
                    No properties found.
                </div>
            )}
        </div>
    );
}
