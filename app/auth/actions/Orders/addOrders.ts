'use server'

import { sendMail } from "@/app/lib/mail"
import { createServerActionClient} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import generateInvoiceEmailBody from "./emailTemplate"
import { InvoiceEmailData } from "@/app/lib/definitions"


export default async function addCustomerOrder(cart: any, total: number, formData: FormData): Promise<{ message: string }> {     
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })

    let order_id;

    try{
  
        const firstName = formData.get('firstName') as string
        const lastName = formData.get('lastName') as string
        const contact_no = formData.get('contact_no') as string
        const address = formData.get('address') as string
        const delivery_mode = formData.get('delivery_mode') as string
        const remarks = formData.get('remarks') as string
        const water_station_id = formData.get('water_station_id')
        const water_station_user_id = formData.get('refilling_station_user_id')
        const water_station_name = formData.get('refilling_station_name') as string

        //save on the customer table
        const {data: customerData, error: customerError} = await supabase.from('customers')
            .upsert({
                firstName,
                lastName,
                contact_no,
                address,
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
                const {data: orderData, error: orderError} = await supabase.from('orders')
                    .upsert({
                        created_at : new Date(),
                        remarks,
                        water_station_id : water_station_id,
                        customer_id : customerId,
                        water_station_user_id,
                        total,
                        delivery_mode,
                    }).select()
                
                    console.log(orderError, "orderError")
                
                //retrieve order_id 
                order_id = orderData?.[0]?.order_id;
                
                //save the data on the orderItems table
                for (const item of cart){
                    const {id, quantity} = item

                            
                    const {data: orderItems, error: orderItemsError} = await supabase.from('order_items')
                        .upsert({   
                            quantity,
                            order_id,
                            water_type_id : id,
                        })
                        console.log(orderItemsError, "orderItemsError")
                    
                }

            } else {
                // Handle the case when customerId is undefined
                return { message: "CustomerId is not available." };
            }

            console.log(water_station_name, "water station name")

            //sending an email
            try{

                const emailData: InvoiceEmailData = {
                    firstName,
                    lastName,
                    order_id,
                    cart: cart,
                    total: total,
                    remarks,
                    address,
                    delivery_mode,
                    contact_no,
                    water_station_name
                  };

                  const res = await sendMailFunction({
                    to: "ravenousred18@gmail.com",
                    name: `${emailData.firstName} ${emailData.lastName}`,
                    subject: `New Order Placed ${emailData.order_id} on ${water_station_name}`,
                    body: generateInvoiceEmailBody(emailData),
                  });

        

                console.log(res, "email sent")
            }catch(err){
                console.log(err, "email error")
            }

        
            return {  message: `Succesfully added the data` }
    }catch(e){
        return {message: "Failed to submit the form."}
    }

}


export async function sendMailFunction ({to, name, subject, body}: {to: string, name: string; subject: string; body: string}) {
    await sendMail({
        to: to,
        name: name,
        subject: subject,
        body: `${body}`
    })
}


