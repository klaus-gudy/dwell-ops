import { prisma } from "../prisma";
import type { PropertySummary } from "@/types/property";

export async function getProperties(): Promise<PropertySummary[]> {
    try {
        const properties = await prisma.property.findMany({
            select:{
                id: true,
                name: true,
                buildingType: true,
                street: true,
                city: true,
                district: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return properties.map(property => ({
            ...property,
            buildingType: property.buildingType ?? "",
        }));
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw new Error("Could not fetch properties");
    }
}