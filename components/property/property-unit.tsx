import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Unit } from "@/types/property";
import UnitCard from "./unit-card";



export default function PropertyUnit({ units }: { units: Unit[] }) {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">14</p>
                <p className="text-sm text-muted-foreground">Total units</p>
              </div>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Occupied units</p>
              </div>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Vacant units</p>
              </div>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Active leases</p>
              </div>
          </CardContent>
        </Card>
        <Card className="py-3">
          <CardContent>
              <div className="py-2 text-center">
                <p className="items-center text-2xl font-bold">50%</p>
                <p className="text-sm text-muted-foreground">Occupancy rate</p>
              </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between my-4">
        <h2 className="font-semibold text-md">Units</h2>
        <Button className="">
          <Plus className="w-4 h-4 mr-2" /> Add new unit
        </Button>
      </div>

      {units.length === 0 ? (
        <Card>
        <CardContent className="py-8 text-center">
          <h3 className="mb-2 text-lg font-semibold">No units found</h3>
          <p className="mb-4 text-muted-foreground">
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