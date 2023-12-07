
import { Label } from "../ui/label";
import { Input } from "./../ui/input";

interface MyInputProps {
  label: string;
}

const MyInput: React.FC<MyInputProps> = ({ label }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={label} className="block text-lg font-semibold text-cyan-700 mb-2">{label}</Label>
      <Input />
    </div>
  );
};

export default MyInput;