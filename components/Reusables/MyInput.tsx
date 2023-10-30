
interface MyInputProps {
  label: string;
  name: string;
  id: string;
  value: string | number;
  onChange: (event: any) => void; 
  errors: any;
  // onChange: (name: string, value: string | number | null) => void;
  required?: boolean;
  type?: 'text' | 'number';
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
}: MyInputProps) => {

  //extract errors
  let error;
  if(errors && errors[name]) {
    error = errors[name];
  }

  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold text-blue-700 mb-2">{label}</label>
      <input
         type={type} 
         id={id} 
         name={name} 
         required={required} 
         value={value}
         onChange={onChange}
      />
      {error && <p className="text-red-500 text-lg italic mt-2">{error}</p>}
    </div>
  );
};

export default MyInput;