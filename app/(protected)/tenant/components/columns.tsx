"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"

import { DataTableColumnHeader } from "./data-table-column-header"
import { statuses, Tenant } from "@/types/tenant"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Tenant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tenant name" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.getValue("name")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact info" />
    ),
    cell: ({ row }) => {
      const phoneNo = row.original.phoneNo || "N/A"

      return (
        <div className="flex gap-2">
           <Badge variant="outline">{String(phoneNo)}</Badge>
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[120px] items-center gap-2">
          {status.icon && (
            <status.icon className="text-muted-foreground size-4" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  },
  {
    accessorKey: "propertyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">
        {row.getValue("propertyName")}
      </div>
    ),
  },
  {
    accessorKey: "unitName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] font-medium">
        {row.getValue("unitName")}
      </div>
    ),
  },
  {
    accessorKey: "leaseEndingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lease ending" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("leaseEndingDate") as Date
      return (
        <div className="w-[120px]">
          {date ? format(date, "MMM dd, yyyy") : "N/A"}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return (
        <div className="w-[120px] text-muted-foreground">
          {date ? format(date, "MMM dd, yyyy") : "N/A"}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tenant = row.original
      return (
        <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="data-[state=open]:bg-muted size-8"
                >
                  <MoreHorizontal />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem asChild>
                  <Link href={`/tenant/${tenant.id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem><Edit className="w-4 h-4 mr-2" />Edit tenant</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
      )
    },
  },
]