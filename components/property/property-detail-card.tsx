import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Property } from "@/types/property";
import { Button } from "../ui/button";

export default function PropertyOverview({ property }: { property: Property }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Property Information */}
      <Card className="gap-0 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center text-md">
            Property details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-muted-foreground text-md">
            {property.description}
          </p>
          <div className="grid grid-cols-1 space-y-2">

              <div className="flex items-center">
                <label className="w-1/2 text-sm font-medium text-muted-foreground">Building type:</label>
                <p className="w-1/2 text-sm">{property.buildingType}</p>
              </div>
              <Separator />
              <div className="flex items-center">
                <label className="w-1/2 text-sm font-medium text-muted-foreground">Year built:</label>
                <p className="w-1/2 text-sm">{property.yearBuilt}</p>
              </div>
              <Separator />
              <div className="flex items-center">
                <label className="w-1/2 text-sm font-medium text-muted-foreground">Total area(sq ft):</label>
                <p className="w-1/2 text-sm">
                  {property.areaFootage || "N/A"}
                </p>
              </div>
              <Separator />
              <div className="flex items-center">
                <label className="w-1/2 text-sm font-medium text-muted-foreground">Number of floors:</label>
                <p className="w-1/2 text-sm">{property.numberOfFloors || "N/A"}</p>
              </div>
              <Separator />
              <div className="flex items-center">
                <label className="w-1/2 text-sm font-medium text-muted-foreground">Number of parking spaces:</label>
                <p className="w-1/2 text-sm">
                  {property.numberOfParkingSpaces || "N/A"}
                </p>
              </div>
              <Separator />
              <div className="flex items-center">
                <label className="w-1/2 text-sm font-medium text-muted-foreground">Street:</label>
                <p className="w-1/2 text-sm">
                  {" "}
                  {property.address || "N/A"}
                </p>
              </div>
              <Separator />
              <div className="flex items-center">
                <label className="w-1/2 text-sm font-medium text-muted-foreground">District:</label>
                <p>{property.district}</p>
              </div>
              <Separator />
              <div className="flex items-center">
                <label className="w-1/2 text-sm font-medium text-muted-foreground">City:</label>
                <p>{property.city}</p>
              </div>
            </div>
        </CardContent>
      </Card>

      {/* Property Image */}
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
      <div className="space-y-6 lg:col-span-1"></div>

      <Card className="gap-2 shadow-none">
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center rounded-lg bg-secondary aspect-video">
            <div className="text-center text-muted-foreground">
              <p>Map view</p>
              <p className="text-sm">{property.address}</p>
              <p className="text-sm">
                {property.district}, {property.city}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
