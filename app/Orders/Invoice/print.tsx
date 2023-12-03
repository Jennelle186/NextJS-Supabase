'use client'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";
import { WaterType } from "../../lib/definitions";
import InvoiceTitle from "./InvoiceTitle";
import InvoiceNo from "./InvoiceOrderNo";
  // Create styles

  interface User {
    firstName: string;
    lastName: string;
    contact_no: number;
    address: string;
    delivery_mode: string;
    remarks: string;
}

  interface WaterTypeQty extends WaterType {
    quantity: number;
  }
  
  // Update the props for BasicDocument to match the parent component
  interface BasicDocumentProps {
    cart: WaterTypeQty[]; // Update to WaterTypeQty to match the actual type
    total: number;
    user: User;
  }

  const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    }, 
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  });
  
  // Create Document Component
  export function BasicDocument({cart, total, user} : BasicDocumentProps) {
    return (
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
          <InvoiceTitle title='Your Order'/>
          <View>
            <Text>Cart Items: {JSON.stringify(cart, null, 2)}</Text>
          </View>
          <View>
            <Text>Total: {JSON.stringify(total, null, 2)}</Text>
          </View>
          <View>
            <Text>Customer Information: {JSON.stringify(user, null, 2)}</Text>
          </View>

          {/* <InvoiceNo invoice={invoice}/>
                    <BillTo invoice={invoice}/>
                    <InvoiceItemsTable invoice={invoice} />
                    <InvoiceThankYouMsg /> */}
          </Page>
        </Document>
    );
  }
  export default BasicDocument;