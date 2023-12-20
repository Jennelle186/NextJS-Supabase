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

const MyInput: FC<ReusableLabelInputProps> = ({ label, id, value, onChange, required, type, placeholder}) => (
  <div className="flex flex-wrap items-center gap-[15px] px-5">
    <Label.Root className="block text-sm font-medium leading-6 text-cyan-900" htmlFor={label}>
      {label}
    </Label.Root>
    <input
     className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default MyInput;