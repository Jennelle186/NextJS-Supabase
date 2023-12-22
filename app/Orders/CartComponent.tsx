import React from 'react';
import { WaterType } from '../lib/definitions';
import StationDetailsComponent from './stationDetails';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WaterTypeQty extends WaterType {
  quantity: number;
}

interface CartComponentProps {
  cart: WaterTypeQty[];
  waterTypes: WaterType[];
  addQuantity: (itemId: string) => void;
  reduceQuantity: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  addToCart: (waterType: WaterType) => void;
  total: number;
}

const CartComponent: React.FC<CartComponentProps> = ({
  cart,
  addQuantity,
  reduceQuantity,
  removeFromCart,
  waterTypes,
  addToCart,
  total
}) => {
  const formatCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    });
    return formatter.format(amount);
  };

  return (
    <div>
      {/* List of added to the cart orders */}
      <div className="flex max-w-xl flex-col items-start justify-between">
        <div className="group relative">
          <div className="border-b border-gray-900/10 pb-12 pt-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Available Waters</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Add to cart the water that you want to order.</p>
          </div>

          <div className="flex flex-col items-start justify-between">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Water</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waterTypes?.map((waterType) => (
                  <TableRow key={waterType.id}>
                    <TableCell className="font-medium">{waterType.name}</TableCell>
                    <TableCell>{formatCurrency(waterType.price)}</TableCell>
                    <TableCell className="text-left">
                      <button onClick={() => addToCart(waterType)}>Add (Per Liter)</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {cart.length > 0 && (
            <>
                <div className="py-3 flex items-center text-sm text-gray-800 before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-gray-600 dark:after:border-gray-600">
                  Your Order Details
                </div>
              <Table className="rounded-lg border border-[#92DFF3]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Water</TableHead>
                    <TableHead>Liter & Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Add</TableHead>
                    <TableHead>Reduce</TableHead>
                    <TableHead>Remove Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="w-[100px]">{item.name}</TableCell>
                      <TableCell>{item.quantity} x {formatCurrency(item.price)} </TableCell>
                      <TableCell>{formatCurrency(item.quantity * item.price)}</TableCell>
                      <TableCell>
                        <button className="bg-[#0F52BA] rounded-lg border-[7px] border-[#0F52BA] text-[#ECECEC]" onClick={() => addQuantity(item.id)}>+</button>
                      </TableCell>
                      <TableCell>
                        <button className="bg-[#FC6600] rounded-lg border-[7px] border-[#FC6600] text-[#ECECEC]" onClick={() => reduceQuantity(item.id)}>-</button>
                      </TableCell>
                      <TableCell>
                        <button className="bg-[#B80F0A] rounded-lg border-[7px] border-[#B80F0A] text-[#ECECEC]" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}

          {/* This will only show up if cart is not empty */}
          {cart.length !== 0 && (
            <p className="mt-4 text-green-500 flex justify-center">
                Total amount your purchased: {formatCurrency(total)}
              </p>
          )} 
          
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
