import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import { useFormStatus } from "react-dom";

interface FormStatusProps {
  pending: boolean;
}

// Define a generic type for SubmitButtonProps
interface SubmitButtonProps<T = {}>
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    FormStatusProps {
  customProp?: T;
}

const SubmitButton: FunctionComponent<SubmitButtonProps<string>> = ({
  pending = false,
  customProp,
  ...props
}) => {
  return (
    <button
      type="submit"
      aria-disabled={pending}
      {...props}
      className={`flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
        customProp === "special" ? "special-styles" : ""
      }`}
    >
      {props.children || "Submit"}
    </button>
  );
};

export default SubmitButton;
