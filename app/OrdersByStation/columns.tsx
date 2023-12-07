"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Order } from "../lib/definitions"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'order_id',
    header: 'Order ID',
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ordered Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({row}) => {
        const date = new Date(row.getValue('created_at'))
        return date.toUTCString()
    }
  },
  {
    accessorKey: 'customers.firstName',
    header: "First Name",
  },
  {
    accessorKey: 'customers.lastName',
    header: "Last Name",
  },
  {
    accessorKey: 'customers.address',
    header: "Address",
  },
  {
    accessorKey: 'customers.contact_no',
    accessorFn: (row) => row.customers,
    cell: ({row}) => (
      `0${row.original.customers.contact_no}`
    ),
    header: "Contact No",
  },
  {
    accessorKey: 'customers.email',
    header: "Email"
  },
  {
    accessorKey: 'delivery_mode',
    header: "Delivery Mode"
  },
  
  {
    accessorKey: 'total',
    header: "Total Order",
    cell: ({row}) => {
      return <div>₱{row.getValue('total')}.00</div>
  }
},
  {
    accessorKey: 'order_items',
    accessorFn: (row) => row.order_items,
    cell: ({ row }) => (
        row.original.order_items.map((item,i) => {
            return <div className="text-center" key={i}>{item.water_type.name} - {item.quantity}</div>
        })
      ),
    header: "Orders (Water Type and Qty per Liter)",
    enableHiding: true
  },
  {
    accessorKey: 'remarks',
    header: "Remarks"
  }
]
