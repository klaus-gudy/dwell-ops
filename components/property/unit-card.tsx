import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from 'react';
import { Unit } from "@/types/property";
import { CreateLeaseDialog } from "./lease-unit-dialog";

export default function UnitCard({ unit }: { unit: Unit }) {
    return (
      <Card
        className={`hover:shadow-lg transition-shadow gap-2 ${
          unit.status === "OCCUPIED" ? "border-secondary" : "border-primary"
        }`}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center text-md">
                Unit {unit.name}
              </CardTitle>
            </div>
            <Badge variant={unit.status === "OCCUPIED" ? 'secondary' : "default"}>{unit.status === "OCCUPIED" ? "Occupied" : "Vacant"}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-muted-foreground">
                Floor:
              </span>
              <span className="font-medium">{unit.floorNumber ?? "N/A"}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-muted-foreground">
                Base rent:
              </span>
              <span className="font-medium">
                ${unit.baseRent.toLocaleString()}
              </span>
            </div>

            {unit.leases.length > 0 && (
                <>
                <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-muted-foreground">
                  Tenant:
                </span>
                <span className="font-medium">{unit.leases[0].tenant?.name ?? "N/A"}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-muted-foreground">
                  Lease period:
                </span>
                <span className="text-xs font-medium">
                {new Date(unit.leases[0].startDate).toLocaleDateString()}{" "}
                      -{" "}
                      {unit.leases[0].endDate
                        ? new Date(unit.leases[0].endDate).toLocaleDateString()
                        : "Present"}
                </span>
              </div></>
            )}

            {unit.status === "VACANT" && (
              <div className="py-2 text-center">
                <CreateLeaseDialog unit={unit} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
}
