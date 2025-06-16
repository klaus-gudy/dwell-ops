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