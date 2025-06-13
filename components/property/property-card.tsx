import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { PropertySummary } from "@/types/property"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin } from "lucide-react"

interface PropertyCardProps {
  property: PropertySummary
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="h-full py-0 pb-4 overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative w-full h-full aspect-[16/9]">
        <Image
          src="https://place-hold.it/450x400/666/fff/000?text=Property+Image"
          alt={property.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="px-4">
        <div className="flex items-center justify-between">
          <span>{property.name}</span>
          <Badge>{property.buildingType}</Badge>
        </div>
        <div className="flex items-center text-md text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          <p className="text-sm truncate">
            {property.street},{property.district} - {property.city}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <Building className="w-4 h-4 mr-1" />
          <span className="text-sm">12 Units</span>
        </div>
        <Link
          href={`/properties/${property.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
