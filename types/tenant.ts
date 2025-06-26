import {
    CheckCircle,
    Circle,
    CircleOff,
    HelpCircle,
    Timer,
} from "lucide-react"
export interface SelectTenant {
    id: string;
    name: string;
    email: string;
}

export interface Tenant {
    id: string
    name: string
    phoneNo: string
    email: string
    status: string
    unitName: string
    propertyName: string
    leaseEndingDate: Date | null
    createdAt: Date
}

export const statuses = [
    {
        value: "expiring soon",
        label: "Expiring Soon",
        icon: HelpCircle,
    },
    {
        value: "no lease",
        label: "No Lease",
        icon: Circle,
    },
    {
        value: "overdue",
        label: "Overdue",
        icon: Timer,
    },
    {
        value: "active",
        label: "Active",
        icon: CheckCircle,
    },
    {
        value: "former",
        label: "Former",
        icon: CircleOff,
    },
]