'use server'

import { createServerActionClient} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


export default async function addCustomerOrder(cart: any, total: number, formData: FormData): Promise<{ message: string }> {     
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })
    console.log(formData, "formData")
    console.log(cart, "prev state")

    try{
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')
        const contact_no = formData.get('contact_no')
        const address = formData.get('address')
        const delivery_mode = formData.get('delivery_mode')
        const remarks = formData.get('remarks')
        const water_station_user_id = formData.get('refilling_station_user_id')

        //save on the customer table
        const {data: customerData, error: customerError} = await supabase.from('customers')
            .upsert({
                firstName,
                lastName,
                contact_no,
                address,
                delivery_mode,
            }).select()

            //1st option is to set the contact_no to be unique. If unique, then this will continue to add the customer.
            //if not unique then get the customer_id
            let customerId;
            //if there is an error, meaning that there are duplicate values for the contact_no 
            if (customerError) {
                // Retrieve the user with the specified contact_no
                const { data: retrieveUser, error: errorRetrieveUser } = await supabase.from('customers')
                    .select('*')
                    .eq('contact_no', contact_no);

                console.log(retrieveUser, "retrieveUser");
                console.log(errorRetrieveUser, "error retrieve user");

                // Retrieve customer_id from retrieveUser
                customerId = retrieveUser?.[0]?.customer_id;
            } else {
                // Use customerData to get customerId
                customerId = customerData?.[0]?.customer_id;
            }

            console.log(customerId, "customer_id")

            //retrieve customer_id
            // const customerId = customerData?.[0]?.customer_id;

            // Check if customerId is defined before saving on the orders table
            if (customerId !== null) {
                // Proceed with further processing
                const water_refilling_station_id = formData.get('refilling_station_id')
                const {data: orderData, error: orderError} = await supabase.from('orders')
                    .upsert({
                        created_at : new Date(),
                        remarks,
                        water_station_id : water_refilling_station_id,
                        customer_id : customerId,
                        water_station_user_id,
                        total
                    }).select()
                
        
                
                //retrieve order_id 
                const order_id = orderData?.[0]?.order_id;
                
                //save the data on the orderItems table
                for (const item of cart){
                    const {id, name, price, user_id, quantity} = item

                            
                    const {data: orderItems, error: orderItemsError} = await supabase.from('order_items')
                        .upsert({   
                            quantity,
                            order_id,
                            water_type_id : id,
                        })
                    
                }

            } else {
                // Handle the case when customerId is undefined
                return { message: "CustomerId is not available." };
            }

        // revalidatePath('/water_station')
        return {  message: `Succesfully added the data` }
    }catch(e){
        return {message: "Failed to submit the form."}
    }

}

