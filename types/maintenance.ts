// Enum types - these will be available from Prisma after migration
export type MaintenanceType = "ELECTRIC_SHORTAGE" | "WATER_LEAKAGE" | "PLUMBING" | "HVAC" | "APPLIANCES" | "STRUCTURAL" | "PEST_CONTROL" | "GENERAL" | "OTHER";
export type MaintenancePriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type MaintenanceStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface MaintenanceRequest {
  id: string;
  unitId: string;
  tenantId: string;
  assignedTo: string | null;
  type: MaintenanceType;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  title: string;
  description: string | null;
  comments: string | null;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  unit: {
    id: string;
    name: string;
    property: {
      name: string;
    };
  };
  tenant: {
    id: string;
    name: string | null;
    email: string;
  };
  assignedUser?: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

export interface MaintenanceRequestSummary {
  id: string;
  type: MaintenanceType;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  title: string;
  tenantName: string | null;
  unitName: string;
  propertyName: string;
  assignedTo: string | null;
  assignedUserName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const maintenanceTypes = [
  {
    value: "ELECTRIC_SHORTAGE",
    label: "Electric Shortage",
  },
  {
    value: "WATER_LEAKAGE",
    label: "Water Leakage",
  },
  {
    value: "PLUMBING",
    label: "Plumbing",
  },
  {
    value: "HVAC",
    label: "HVAC",
  },
  {
    value: "APPLIANCES",
    label: "Appliances",
  },
  {
    value: "STRUCTURAL",
    label: "Structural",
  },
  {
    value: "PEST_CONTROL",
    label: "Pest Control",
  },
  {
    value: "GENERAL",
    label: "General",
  },
  {
    value: "OTHER",
    label: "Other",
  },
] as const;

export const maintenancePriorities = [
  {
    value: "LOW",
    label: "Low",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "MEDIUM",
    label: "Medium", 
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "HIGH",
    label: "High",
    color: "bg-orange-100 text-orange-800",
  },
  {
    value: "URGENT",
    label: "Urgent",
    color: "bg-red-100 text-red-800",
  },
] as const;

export const maintenanceStatuses = [
  {
    value: "OPEN",
    label: "Open",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "COMPLETED",
    label: "Completed",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    color: "bg-gray-100 text-gray-800",
  },
] as const;