import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Property } from "@/types/property";
import { Button } from "../ui/button";

export default function PropertyOverview({ property }: {property: Property}) {

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="gap-0 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center text-md">
              Property details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground text-md">{property.description}</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Building type:</span>
                  <span>{property.buildingType}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Year built:</span>
                  <span className="flex items-center">
                    {property.yearBuilt}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total area(sq ft):</span>
                  <span className="flex items-center">
                    {property.areaFootage || "N/A"}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Number of floors:</span>
                  <span>{property.numberOfFloors || "N/A"}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Number of parking spaces:</span>
                  <span className="flex items-center">
                    {property.numberOfParkingSpaces || "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Street:</span>
                  <span className="flex items-center"> {property.address || "N/A"}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">District:</span>
                  <span>{property.district}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">City:</span>
                  <span>{property.city}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
      <Card className="gap-2 shadow-none">
          <CardHeader>
            <CardTitle>Property Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg bg-secondary aspect-video">
              <div className="text-center text-muted-foreground">
                <p>No images available</p>
                <Button variant="default" size="sm" className="mt-2">
                  Upload Images
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-2 shadow-none">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-lg bg-secondary aspect-video">
              <div className="text-center text-muted-foreground">
                <p>Map view</p>
                <p className="text-sm">{property.address}</p>
                <p className="text-sm">{property.district}, {property.city}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
