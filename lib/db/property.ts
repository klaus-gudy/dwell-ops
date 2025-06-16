"use server";

import { prisma } from "../prisma";
import type { PropertySummary } from "@/types/property";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { AddPropertySchema } from "@/schemas/index";

export async function getProperties(): Promise<PropertySummary[]> {
  try {
    const properties = await prisma.property.findMany({
      select: {
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
    return properties.map((property) => ({
      ...property,
      buildingType: property.buildingType ?? "",
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Could not fetch properties");
  }
}

export async function getPropertyById(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id }
    });

    if (!property) {
      throw new Error("Property not found");
    }

    return property;
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    throw new Error("Could not fetch property");
  }
}

export async function createProperty(
  values: z.infer<typeof AddPropertySchema>
) {
  const {
    name,
    description,
    street,
    district,
    city,
    buildingType,
    yearBuilt,
    areaInSquareFeet,
    numberOfFloors,
    parkingSpaces,
  } = values;

  try {
    await prisma.property.create({
      data: {
        organizationId: "cmbu4p2cw0000zl0wf7812om3",
        name,
        description: description || undefined,
        street,
        district,
        city,
        address: `${street}, ${district}, ${city}`,
        buildingType: buildingType || undefined,
        yearBuilt,
        areaFootage: areaInSquareFeet
          ? parseFloat(areaInSquareFeet.toString())
          : null,
        numberOfFloors: numberOfFloors || null,
        numberOfParkingSpaces: parkingSpaces || null,
      },
    });

    revalidatePath("/property");
  } catch (error) {
    console.error("Error creating property:", error);
    throw new Error("Failed to create property");
  }
}
