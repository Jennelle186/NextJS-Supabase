import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SubmitButton: FunctionComponent<SubmitButtonProps> = (props) => {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" aria-disabled={pending} {...props} className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
      Submit
    </button>
  );
}

export default SubmitButton;
