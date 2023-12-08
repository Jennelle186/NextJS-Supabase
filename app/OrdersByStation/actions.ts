'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidate } from "../layout"
import { revalidatePath } from "next/cache"

export const updateOrderStatus = async (order_id: string) => {
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })

    try{
    
        const { data, error } = await supabase
        .from('orders')
        .update({ order_status : 'Delivered' })
        .eq('order_id', order_id)  

        if(data){
            console.log('updated the order status')
        }

        if(error){
            console.log(error, "error updating order status")
        }

        revalidatePath('/')

    }catch(error){
        console.log(error, "error")
    }
}

export const updateToCancelledOrder = async (order_id: string) => {
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })

    try{

        const { data, error } = await supabase
        .from('orders')
        .update({ order_status : 'Cancelled' })
        .eq('order_id', order_id)  

        if(data){
            console.log('successfully updated the order status to cancelled')
        }

        if(error){
            console.log(error, "error updating order status")
        }

        revalidatePath('/')

    }catch(error){
        console.log(error, "error")
    }
}