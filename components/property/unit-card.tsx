import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from 'react';
import { Unit } from "@/types/property";

export default function UnitCard({ unit }: { unit: Unit }) {
    return (
        <Card className={`hover:shadow-lg transition-shadow gap-2 ${unit.status === 'OCCUPIED' ? 'border-secondary' : 'border-primary'}`}>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="flex items-center text-md">
                            Unit {unit.name}
                        </CardTitle>
                    </div>
                    <Badge>
                        {unit.status === 'OCCUPIED' ? 'Occupied' : 'Vacant'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-muted-foreground">
                            Floor:
                        </span>
                        <span className="font-medium">{unit.floorNumber ?? 'N/A'}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-muted-foreground">
                            Base rent:
                        </span>
                        <span className="font-medium">${unit.baseRent.toLocaleString()}</span>
                    </div>

                    {unit.status === 'OCCUPIED' && (
                        <div className="text-center ">
                            <span className="text-sm font-medium">Currently occupied</span>
                        </div>
                    )}

                    {unit.status === 'VACANT' && (
                        <div className="py-2 text-center">
                            <span className="text-sm font-medium text-primary hover:underline">Available for rent</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
