import { InvoiceEmailData } from "@/app/lib/definitions";

// Reusable template function for the invoice email body
  export default function generateInvoiceEmailBody(data: InvoiceEmailData): string {
    const { firstName, lastName, order_id, cart, total, remarks, water_station_name, address, delivery_mode, contact_no } = data;
  
    const formatCurrency = (amount: number) => {
      const formatter = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      });
      return formatter.format(amount);
    };

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
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">

          <div style="text-align: center; font-size: 24px; margin-bottom: 20px;">Invoice</div>

          <div style="margin-bottom: 15px;">
              <p>Dear ${firstName} ${lastName}, this serves as your invoice of date ${new Date().toDateString()}.</p>
              <p>Your information:</p>
              <p>Address: ${address}</p>
              <p>Contact_no: ${contact_no}</p>
              <p>Thank you for placing an order with ${water_station_name}.</p>
              <br/>
          </div>

          <div style="margin-top: 20px;">
              <p>Order details:</p>
              <p>Invoice ID: ${order_id}</p>
              ${itemsTable}
              <br/>
          </div>

          <div style="margin-top: 20px;">
              <p>Total: ${formatCurrency(total)}</p>
              <p>Remarks: ${remarks}</p>
              <br/>
          </div>

          <div style="margin-top: 20px;">
              <p>Best regards, ${water_station_name}</p>
              <br/>
          </div>

        </div>
      `;
  }