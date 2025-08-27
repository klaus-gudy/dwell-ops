"use server";

// import { prisma } from "../prisma";
import { z } from "zod";
import { CreateMaintenanceRequestSchema, UpdateMaintenanceRequestSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import type { MaintenanceRequestSummary } from "@/types/maintenance";

// Mock data for demonstration - will be replaced with actual database calls after migration
export async function getMaintenanceRequests(): Promise<MaintenanceRequestSummary[]> {
  const mockData: MaintenanceRequestSummary[] = [
    {
      id: "1",
      type: "WATER_LEAKAGE",
      priority: "HIGH",
      status: "OPEN",
      title: "Kitchen faucet leaking",
      tenantName: "Fatuma Jabir",
      unitName: "Unit 102",
      propertyName: "Kachua Apartments",
      assignedTo: null,
      assignedUserName: null,
      createdAt: new Date("2025-01-15"),
      updatedAt: new Date("2025-01-15"),
    },
    {
      id: "2", 
      type: "ELECTRIC_SHORTAGE",
      priority: "URGENT",
      status: "IN_PROGRESS",
      title: "Power outage in bedroom",
      tenantName: "John Doe",
      unitName: "Unit 201",
      propertyName: "Sunset Apartments",
      assignedTo: "fundi-1",
      assignedUserName: "Ali Mwanga",
      createdAt: new Date("2025-01-14"),
      updatedAt: new Date("2025-01-15"),
    },
    {
      id: "3",
      type: "PLUMBING",
      priority: "MEDIUM", 
      status: "COMPLETED",
      title: "Toilet not flushing properly",
      tenantName: "Jane Smith",
      unitName: "Unit 105",
      propertyName: "Kachua Apartments",
      assignedTo: "fundi-2",
      assignedUserName: "Hassan Juma",
      createdAt: new Date("2025-01-10"),
      updatedAt: new Date("2025-01-12"),
    },
    {
      id: "4",
      type: "HVAC",
      priority: "LOW",
      status: "OPEN",
      title: "Air conditioning not cooling",
      tenantName: "Mary Johnson",
      unitName: "Unit 301",
      propertyName: "Sunset Apartments",
      assignedTo: null,
      assignedUserName: null,
      createdAt: new Date("2025-01-12"),
      updatedAt: new Date("2025-01-12"),
    },
  ];

  // Sort by priority and date
  return mockData.sort((a, b) => {
    const priorityOrder: Record<string, number> = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export async function getMaintenanceRequestById(id: string) {
  const requests = await getMaintenanceRequests();
  const request = requests.find(r => r.id === id);
  
  if (!request) {
    throw new Error("Maintenance request not found");
  }

  return {
    ...request,
    description: "Detailed description of the maintenance issue...",
    comments: "Initial comment from tenant...",
  };
}

export async function createMaintenanceRequest(data: z.infer<typeof CreateMaintenanceRequestSchema>) {
  // Mock implementation - in real app this would save to database
  console.log("Creating maintenance request:", data);
  
  // For now, just return a mock response
  return {
    id: `new-${Date.now()}`,
    ...data,
    status: "OPEN" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function updateMaintenanceRequest(data: z.infer<typeof UpdateMaintenanceRequestSchema>) {
  // Mock implementation - in real app this would update the database
  console.log("Updating maintenance request:", data);
  
  // For now, just return success
  return {
    id: data.id,
    ...data,
    updatedAt: new Date(),
  };
}

// Mock maintenance workers data
export async function getMaintenanceWorkers() {
  return [
    { id: "fundi-1", name: "Ali Mwanga", email: "ali@example.com" },
    { id: "fundi-2", name: "Hassan Juma", email: "hassan@example.com" },
    { id: "fundi-3", name: "Grace Mwangi", email: "grace@example.com" },
  ];
}