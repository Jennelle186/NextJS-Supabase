"use client"

import { ColumnDef } from "@tanstack/react-table"
import { WaterType } from "../lib/definitions"

import Link from "next/link"
import DeleteWaterTypeButton from "@/components/WaterTypes/DeleteButton"
import { Button } from "@/components/ui/button"


export const columns: ColumnDef<WaterType>[] = [
  {
    accessorKey: 'name',
    header: 'Water Type Name',
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(amount)
 
      return formatted
    },
  },
  {
    id: 'actions',
    header: 'Edit',
    cell: ({row}) => {
        const data = row.original
        return (
           <>
            <Link
            href={{
                pathname: `/waterTypes/edit/${data.id}`,
                query: data // the data
            }}
            >
                <Button>
                    🖉 Edit
                </Button>
            </Link>

           </>
        )
    }
  },
  {
    id:'actions',
    header: 'Delete',
    cell: ({row}) => {
        const data = row.original
        return (
            <>
                <DeleteWaterTypeButton water_id ={data.id} water_name={data.name}/>
            </>
        )
    }
  }
]







