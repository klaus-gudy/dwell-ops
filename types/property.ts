export interface PropertySummary {
    id: string;
    name: string;
    buildingType: string;
    street: string;
    city: string;
    district: string;
}

export interface Property {
    id: string;
    name: string;
    description: string | null;
    address: string | null;
    district: string;
    city: string;
    buildingType: string | null;
    yearBuilt: number | null;
    areaFootage: number | null;
    numberOfFloors: number | null;
    numberOfParkingSpaces: number | null;
}

export interface UnitSummary {
    id: string;
    name: string;
    status: string;
    baseRent: number;
}

export interface Unit {
    id: string;
    name: string;
    status: string;
    floorNumber: number | null;
    baseRent: number;
    leases: {
        id: string;
        startDate: Date;
        endDate: Date | null;
        monthlyRent: number;
        tenant: {
          id: string;
          name: string | null;
        };
      }[];
}

export interface PropertyMetrics {
    totalUnits: number;
    occupiedUnits: number;
    vacantUnits: number;
    expiringSoonLeases: number;
    occupancyRate: number;
  }