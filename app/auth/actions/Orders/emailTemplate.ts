import { InvoiceEmailData } from "@/app/lib/definitions";

// Reusable template function for the invoice email body
  export default function generateInvoiceEmailBody(data: InvoiceEmailData): string {
    const { firstName, lastName, order_id, cart, total, remarks, water_station_name, address, delivery_mode, contact_no } = data;
  
    const itemsTable = `
    <table class="table-auto">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(
          (item) => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>${item.price}</td>
            </tr>
          `
        ).join("\n")}
      </tbody>
    </table>
  `;
  
  // Now, 'itemsTable' contains the HTML table structure.
  

    return `
          Dear ${firstName} ${lastName}, this serves as your invoice of date ${new Date().toDateString()}. 
          <br/>
          Your information:
          Address: ${address}
          Contact_no: ${contact_no}
          <br/>
          Thank you for placing an order with ${water_station_name}.
          <br/>
          Order details:
          Invoice ID: ${order_id}
          <br/>
          ${itemsTable}

          ${JSON.stringify(cart)}
          <br/>
          Total: ${total}
          Remarks: ${remarks}
          <br/>
          Best regards,
          ${water_station_name}
      `;
  }