'use client'
import { useMemo, useState } from 'react';
import { WaterStationType, WaterType } from '../lib/definitions';
import MyInput from '@/components/Reusables/MyInput';
import addCustomerOrder from '../auth/actions/Orders/addOrders';
import SubmitButton from '@/components/Reusables/SubmitButton';
import { useFormState } from 'react-dom';

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

  console.log(refillingStation,"refilling station")

  return (
    <div id="CheckOutPage" className='mt-4 max-w-[1100px] msx-auto'>
      <div className='text-2xl font-bold mt-4 mb-4'>Order Page</div>

      {/* Render other components based on the data */}
      <h1>Station Details: </h1>
      <strong>Station Name:</strong> {refillingStation?.station_name} <br />
      <strong>Address:</strong> {refillingStation?.address + "," + refillingStation?.barangay} <br />
      <strong>Landmark:</strong> {refillingStation?.landmark} <br />
      <strong>Contact No:</strong> {refillingStation?.contact_no} <br />
      {refillingStation?.tel_no && (
        <p>Tel No: {refillingStation.tel_no}</p>
      )}
      <div className="py-3 flex items-center text-sm text-gray-800 before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">
        User Form
      </div>
      <form action={(data) => addCustomerOrder(cart, total, data)}>
        <input type="hidden" name="refilling_station_id" value={refillingStation?.id}/>
        <input type="hidden" name="refilling_station_user_id" value={refillingStation?.user_id}/>
        <MyInput
          id="firstName"
          label="First Name" 
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
          required 
          type="text" 
          errors={'Invalid'}
        /> 
         <MyInput
          id="lastName"
          label="Last Name" 
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          required 
          type="text" 
          errors={'Invalid'}
        /> 
         <MyInput
          id="contact_no"
          label="Contact No" 
          name="contact_no"
          value={user.contact_no}
          onChange={handleInputChange}
          required 
          type="text" 
          errors={'Invalid'}
        /> 
         <MyInput
          id="address"
          label="Bldg No, Zone, Street, Barangay" 
          name="address"
          value={user.address}
          onChange={handleInputChange}
          required 
          type="text" 
          errors={'Invalid'}
        />
        Available delivery mode: {refillingStation?.delivery_mode} 
        <MyInput
          id="delivery_mode"
          label="Delivery Mode" 
          name="delivery_mode"
          value={user.delivery_mode}
          onChange={handleInputChange}
          required 
          type="text" 
          errors={'Invalid'}
        />
        <MyInput
          id="remarks"
          label="Remarks or Instructions you would like to add" 
          name="remarks"
          value={user.remarks}
          onChange={handleInputChange}
          required 
          type="text" 
          errors={'Invalid'}
        />
      
      {cart.length !== 0 ? <><SubmitButton pending={false}/></>:<>You must add waters for your orders</>}
      
      </form>
      <div className="py-3 flex items-center text-sm text-gray-800 before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">
        Add your order
      </div>
    

      <h1>Water Available:</h1>
      {waterTypes?.map((waterType) => (
       <div key={waterType.id}>
       <strong>Name:</strong> {waterType.name}, <strong>Price:</strong> {waterType.price}
       <button onClick={() => addToCart(waterType)}>Add to Cart</button>
     </div>
      ))}
      <div className="py-3 flex items-center text-sm text-gray-800 before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">
        Your Cart
      </div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <p>{item.name} - ${item.price} </p>
                <p>Quantity: {item.quantity}</p> 
                <p>Unit price: {item.quantity * item.price}</p>
                <button onClick={() => addQuantity(item.id)}>+ Add quantity</button>
                <button onClick={() => reduceQuantity(item.id)}>- Reduce quantity</button>
                <br/>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

        <div className="py-3 flex items-center text-sm text-gray-800 before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">
          Your Final Order
        </div>

          <div>
            {cart.length === 0 ? (
              <h3>You do not have any orders</h3>
            ): (
              <div>
                {cart.map((item,i) => (
                  <ul key={i}>
                    <li>{item.name} - {item.price}</li>
                    <li>Unit Price: {item.price * item.quantity}</li>
                  </ul>
                ))}
                <h3>Total Amount of your purchase: Php {total}</h3>
              </div>
            )}
            
          </div>
        </div>
      

  );
};

export default OrderComponent;


