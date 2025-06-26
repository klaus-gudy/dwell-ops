import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    Circle,
    CircleOff,
    HelpCircle,
    Timer,
  } from "lucide-react"
  
  export const labels = [
    {
      value: "bug",
      label: "Bug",
    },
    {
      value: "feature",
      label: "Feature",
    },
    {
      value: "documentation",
      label: "Documentation",
    },
  ]
  
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
  
  export const priorities = [
    {
      label: "Low",
      value: "low",
      icon: ArrowDown,
    },
    {
      label: "Medium",
      value: "medium",
      icon: ArrowRight,
    },
    {
      label: "High",
      value: "high",
      icon: ArrowUp,
    },
  ]