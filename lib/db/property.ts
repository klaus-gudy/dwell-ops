"use server";

import { prisma } from "../prisma";
import type { PropertySummary } from "@/types/property";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { AddPropertySchema, AddUnitSchema } from "@/schemas/index";
import { subDays, addDays } from "date-fns";

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
        updatedAt: "desc",
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

export async function getUnitsByPropertyId(propertyId: string) {
  try {
    const units = await prisma.unit.findMany({
      where: {
        propertyId: propertyId,
      },
      include: {
        leases: {
          take: 1,
          orderBy: {
            startDate: "desc",
          },
          where: {
            isActive: true,
          },
          include: {
            tenant: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return units;
  } catch (error) {
    console.error("Error fetching units by property ID:", error);
    throw new Error("Could not fetch units");
  }
}

export async function createUnit(values: z.infer<typeof AddUnitSchema>) {
  const { propertyId, name, baseRent } = values;

  try {
    await prisma.unit.create({
      data: {
        propertyId,
        name,
        baseRent,
      },
    });
    revalidatePath(`/property/${propertyId}`);
  } catch (error) {
    console.error("Error creating unit:", error);
    throw new Error("Failed to create unit");
  }
}

export async function getPropertyDashboardMetrics(propertyId: string) {
  const today = new Date();
  const in30Days = addDays(today, 30);
  try {
    const [totalUnits, occupiedUnits, expiringSoonLeases ] = await Promise.all([
      prisma.unit.count({
        where: { propertyId },
      }),
      prisma.unit.count({
        where: {
          propertyId,
          status: "OCCUPIED",
        },
      }),
      prisma.lease.count({
        where: {
          unit: {
            propertyId,
          },
          endDate: {
            gte: today,
            lte: in30Days,
          },
          status: "ACTIVE",
        },
      })
    ]);

    const vacantUnits = totalUnits - occupiedUnits;
    const occupancyRate = totalUnits === 0 ? 0 : Math.round((occupiedUnits / totalUnits) * 100);

    return {
      totalUnits,
      occupiedUnits,
      vacantUnits,
      expiringSoonLeases,
      occupancyRate,
    };
  } catch (error) {
    console.error("Error getting dashboard metrics:", error);
    throw new Error("Failed to get dashboard metrics");
  }
}
