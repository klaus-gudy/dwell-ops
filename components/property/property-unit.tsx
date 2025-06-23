import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Unit, PropertyMetrics } from "@/types/property";
import UnitCard from "./unit-card";
import { AddUnitDialog } from "./add-unit-dialog";

export default function PropertyUnit({ units, propertyId, metrics }: { units: Unit[], propertyId: string, metrics: PropertyMetrics; }) {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">{metrics.totalUnits}</p>
                <p className="text-sm text-muted-foreground">Total units</p>
              </div>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">{metrics.occupiedUnits}</p>
                <p className="text-sm text-muted-foreground">Occupied units</p>
              </div>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">{metrics.vacantUnits}</p>
                <p className="text-sm text-muted-foreground">Vacant units</p>
              </div>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent>
                <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">{metrics.expiringSoonLeases}</p>
                <p className="text-sm text-muted-foreground">Expiring soon leases</p>
                </div>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">{metrics.occupancyRate}%</p>
                <p className="text-sm text-muted-foreground">Occupancy rate</p>
              </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between my-4">
        <h2 className="font-semibold text-md">Units</h2>
        <AddUnitDialog propertyId={propertyId} />
      </div>

      {units.length === 0 ? (
        <Card>
        <CardContent className="py-8 text-center">
          <h3 className="mb-2 font-semibold text-md">No units found</h3>
          <p className="mb-4 text-md text-muted-foreground">
            This property doesn&#39;t have any units yet. Add your first unit to get started.
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add first unit
          </Button>
        </CardContent>
      </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      )}
    </div>
  );
}