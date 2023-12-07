
interface MyInputProps {
  label: string;
  name: string;
  id: string;
  value: string | number;
  onChange: (event: any) => void; 
  errors: any;
  // onChange: (name: string, value: string | number | null) => void;
  required?: boolean;
  type?: 'text' | 'number' | 'email';
  placeholder?: string;
}

const MyInput: React.FC<MyInputProps> = ({
  label,
  name,
  id,
  value,
  onChange,
  errors,
  required = false,
  type = 'text',
  placeholder
}: MyInputProps) => {

  //extract errors
  let error;
  if(errors && errors[name]) {
    error = errors[name];
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold text-cyan-700 mb-2">{label}</label>
      <input
         type={type} 
         id={id} 
         name={name} 
         required={required} 
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {error && <p className="text-red-500 text-lg italic mt-2">{error}</p>}
    </div>
  );
};

export default MyInput;