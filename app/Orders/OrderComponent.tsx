'use client'
import { useMemo, useState } from 'react';
import { WaterStationType, WaterType } from '../lib/definitions';
import MyInput from '@/components/Reusables/MyInput';
import addCustomerOrder from '../auth/actions/Orders/addOrders';
import BasicDocument from './Invoice/print';
import { PDFDownloadLink} from '@react-pdf/renderer';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import StationDetailsComponent from './stationDetails';
import CartComponent from './CartComponent';
import CustomerInfoComponent from './CustomerInformation';

interface User {
  firstName: string;
  lastName: string;
  contact_no: number;
  address: string;
  delivery_mode: string;
  remarks: string;
  email: string;
}

interface WaterTypeQty extends WaterType {
  quantity: number;
}

interface OrderComponentProps {
  error: Error | null;
  waterTypes: WaterType[] | null; // Replace YourWaterTypeType with the actual type
  refillingStation: WaterStationType | null; // Replace YourRefillingStationType with the actual type
}

const OrderComponent: React.FC<OrderComponentProps> = ({
  error,
  waterTypes,
  refillingStation,
}) => {

  if (error) {
    console.error("Error:", error);
  }

  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    contact_no: 0,
    address: '',
    delivery_mode: '',
    remarks: '',
    email: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [cart, setCart] = useState< WaterTypeQty[]>([]);

  const addQuantity = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const reduceQuantity = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
          : item
      ).filter((item) => item.quantity > 0) // Remove items with quantity 0 from the cart
    );
  };
  

  const addToCart = (waterType: WaterType) => {
    const existingItemIndex = cart.findIndex((item) => item.id === waterType.id);
  
    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update its quantity
      setCart((prevCart) => {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1,
        };
        return newCart;
      });
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart((prevCart) => [...prevCart, { ...waterType, quantity: 1 }]);
    }
  };
  

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const total = useMemo<number>(() => {
    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return calculateTotal();
  }, [cart])

  const [forPrinting, setForPrint] = useState<Boolean>(false); //to show the printing button
  const [message, setMessage] = useState<String>(''); // to return a message
    
    //loading state for the submission
    const [loading, setLoading] = useState<Boolean>(false);
  

  //form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Create a FormData instance
    const formData = new FormData();
  
    // Append form fields to FormData
    formData.append('firstName', e.currentTarget.firstName.value);
    formData.append('lastName', e.currentTarget.lastName.value);
    formData.append('contact_no', e.currentTarget.contact_no.value);
    formData.append('email', e.currentTarget.email.value)
    formData.append('address', e.currentTarget.address.value);
    formData.append('delivery_mode', e.currentTarget.delivery_mode.value);
    formData.append('remarks', e.currentTarget.remarks.value);
    formData.append('water_station_id', e.currentTarget.refilling_station_id.value )
    formData.append('refilling_station_user_id', e.currentTarget.refilling_station_user_id.value);
    formData.append('refilling_station_name', e.currentTarget.refilling_station_name.value);

  //form submission
    try{
      const res =  await addCustomerOrder(cart, total, formData);
      setMessage(res.message)

      // Reset the user state to blank values
      setUser({
        firstName: '',
        lastName: '',
        contact_no: 0,
        address: '',
        delivery_mode: '',
        remarks: '',
        email: ''
      });

      setCart([])
      setForPrint(true);
      setLoading(true);

    }catch(err){
      setMessage("Unable to save.")
    }
  };

  const router = useRouter()


  return (
  <div className='py-7'>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Order page for {refillingStation?.station_name}</h3>
            <p className="mt-4 text-gray-500 text-justify">
              {refillingStation?.remarks}
            </p>
          {/* <StationDetailsComponent refillingStation={refillingStation}/> */}
      <div id="CheckOutPage" className='bg-white sm:py-3'>
        <div className='flex justify-center items-center p-4'>
          <div className='rounded-lg overflow-hidden border border-[#92DFF3] bg-white w-[85%] max-w-[500px] p-2'>
            {/* Render other components based on the data */}
            <StationDetailsComponent refillingStation={refillingStation}/>
          </div>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 sm:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <article className="flex max-w-xl flex-col items-start justify-between">
                  {/* Component for the list of available waters and adding it to the cart */}
                    {waterTypes ? (
                      <>
                        <CartComponent
                          cart={cart}
                          waterTypes={waterTypes}
                          addToCart={addToCart} 
                          addQuantity={addQuantity}
                          reduceQuantity={reduceQuantity}
                          removeFromCart={removeFromCart}
                          total={total}
                        />
                      </>
                    ) : (
                      <p>No water types available</p>
                    )}
              </article>
              {/* Customer Information Component */}
              <div className="flex max-w-xl flex-col items-start justify-between">
                <div className="group relative">     
                    <CustomerInfoComponent
                      handleFormSubmit={handleFormSubmit}
                      handleInputChange={handleInputChange}
                      user={user}
                      refillingStation={refillingStation}
                      cart={cart}
                    />
                    <p className="mt-4 text-green-500 flex justify-center">{message}</p>
                </div>
              </div>
          </div> 
      </div>
        
        {/* PRINTING IS NOT ENTIRELY OKAY SO WE SETTLED WITH EMAIL */}
        {/* {forPrinting === true && 
        <>
          <h1>This is your invoice. Please download it</h1>
            <PDFDownloadLink document={<BasicDocument cart={cart} total={total} user={user}/>} fileName="my-order.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>
        </>
        }         */}
  </div>
  );
};

export default OrderComponent;




