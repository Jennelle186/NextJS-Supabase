import { ButtonHTMLAttributes, FunctionComponent } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SubmitButton: FunctionComponent<SubmitButtonProps> = (props) => {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" aria-disabled={pending} {...props}>
      Submit
    </button>
  );
}

export default SubmitButton;
