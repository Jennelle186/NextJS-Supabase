"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Order } from "../lib/definitions"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateOrderStatus, updateToCancelledOrder } from "./actions"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


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
  },
  {
    accessorKey: 'order_status',
    header: "Status"
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original

     return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => updateOrderStatus(row.original.order_id)}>
              Deliver Order
            </DropdownMenuItem>
            <Dialog>
              <DialogTrigger>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Cancel Order
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Do not forget to call the customers
                    as why you have cancelled their order.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit" variant="destructive" onClick={() => updateToCancelledOrder(row.original.order_id)}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


export const columnsForDeliveredAndCancelled: ColumnDef<Order>[] = [
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
  },
  {
    accessorKey: 'order_status',
    header: "Status"
  },
]







