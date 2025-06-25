"use server";

import { Tenant } from "@/types/tenant";
import { prisma } from "../prisma";
import {  isBefore } from "date-fns";

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

export async function getTenantsList(): Promise<Tenant[]> {
  const leases = await prisma.lease.findMany({
    where: {
      isActive: true,
      status: "ACTIVE",
    },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
          // phoneNo: true, // Only if you store it on User
        },
      },
      unit: {
        select: {
          name: true,
          property: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const tenants: Tenant[] = leases.map((lease) => ({
    id: lease.tenant.id,
    name: lease.tenant.name ?? "",
    email: lease.tenant.email,
    phoneNo: "N/A", // Replace with lease.tenant.phoneNo if you store it
    status: lease.status,
    unitName: lease.unit.name,
    propertyName: lease.unit.property.name,
    leaseEndingDate: lease.endDate,
    createdAt: lease.createdAt,
  }));

  return tenants;
}

export async function getAllTenantsWithLeaseStatus(): Promise<Tenant[]> {
  const tenants = await prisma.user.findMany({
    where: {
      memberships: {
        some: {
          roles: {
            has: "TENANT",
          },
        },
      },
    },
    include: {
      leases: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          unit: {
            select: {
              name: true,
              property: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);

  return tenants.map((tenant) => {
    const latestLease = tenant.leases[0];

    let status = "no lease";
    let unitName = "";
    let propertyName = "";
    let leaseEndingDate = null;

    if (latestLease) {
      leaseEndingDate = latestLease.endDate;
      unitName = latestLease.unit.name;
      propertyName = latestLease.unit.property.name;

      if (latestLease.status !== "ACTIVE") {
        status = "former";
      } else if (leaseEndingDate && isBefore(leaseEndingDate, thirtyDaysFromNow)) {
        status = "expiring soon";
      } else {
        status = "active";
      }
    }

    return {
      id: tenant.id,
      name: tenant.name ?? "",
      phoneNo: "N/A",
      email: tenant.email,
      status,
      unitName,
      propertyName,
      leaseEndingDate,
      createdAt: tenant.createdAt,
    };
  });
}