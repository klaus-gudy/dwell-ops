"use server";

import { prisma } from "../prisma";

export async function getAllTenants() {
  try {
    const tenants = await prisma.organizationMember.findMany({
      where: {
        organizationId: "cmbu4p2cw0000zl0wf7812om3", // Replace with orgId if needed
        isActive: true,
        roles: {
          has: "TENANT",
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return tenants.map(member => member.user);
  } catch (error) {
    console.error("Error fetching tenants:", error);
    throw new Error("Could not fetch tenants");
  }
}