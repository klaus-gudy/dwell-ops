"use server";

import { prisma } from "../prisma";
import { z } from "zod";
import { CreateLeaseSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function createLease(data: z.infer<typeof CreateLeaseSchema>) {
    const { unitId, tenantId, startDate, endDate, monthlyRent } = data;

    try {
        const start = new Date(startDate);
        const endDt = new Date(endDate);
        const rent = parseFloat(monthlyRent);

        // Calculate duration in months
        const duration =
            endDt.getMonth() -
            start.getMonth() +
            12 * (endDt.getFullYear() - start.getFullYear());


        const totalRent = rent * duration;

        const lease = await prisma.lease.create({
            data: {
                unitId,
                tenantId,
                startDate: start,
                endDate: endDt,
                duration,
                monthlyRent: rent,
                rentAmount: totalRent,
                status: "ACTIVE",
                isActive: true,
            },
        });

        // Optionally, update unit status to OCCUPIED
        const updatedUnit = await prisma.unit.update({
            where: { id: unitId },
            data: { status: "OCCUPIED" },
        });
        revalidatePath(`/property/${updatedUnit.propertyId}`);

        return lease;
    } catch (error) {
        console.error("Error creating lease:", error);
        throw new Error("Failed to create lease");
    }
}
