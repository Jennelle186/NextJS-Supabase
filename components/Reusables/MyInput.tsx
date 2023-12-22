import React, { FC } from 'react';
import * as Label from '@radix-ui/react-label';
import { Input } from '../ui/input';

interface ReusableLabelInputProps {
  label: string;
  htmlFor: string;
  defaultValue: string;
  id: string;
  value: string | number;
  onChange: (event: any) => void;
  required?: boolean;
  type?: 'text' | 'number' | 'email';
  placeholder?: string;
}

const MyInput: FC<ReusableLabelInputProps> = ({ label, id, value, onChange, required, type, placeholder }) => (
  <div className="sm:col-span-3"> {/* Adjust px value */}
    <Label.Root className="block text-sm font-medium leading-6 text-cyan-600" htmlFor={label}>
      {label}
    </Label.Root>
    <div className="mt-2">
    <input
    className='focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-3 ring-1 ring-slate-200 shadow-sm"'
      // className="block w-full rounded-md border-0 py-1.5 text-cyan-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
    </div>
    
  </div>
);

export default MyInput;
