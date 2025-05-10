import clsx from "clsx";
import { ReactNode } from "react";

// Define types for the props
interface CustomButtonProps {
  textName: ReactNode; // Allow textName to be a ReactNode (string, element, etc.)
  handleAnything?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => void; // Supports both click and form submit events
  className?: string; // Allow className to be passed as a prop
  type?: "button" | "submit" | "reset"; // Button type, narrowed to valid values
  disabled?: boolean;
}

// custom button
const CustomButton = ({
  textName,
  handleAnything,
  className = "",
  disabled = false,
  type = "button", // default value for 'type'
}: CustomButtonProps) => {
  return (
    <button
      onClick={handleAnything}
      type={type} // the `type` prop here
      disabled={disabled}
      className={clsx(
        "relative inline-flex hover items-center justify-center  px-3 py-2 overflow-hidden font-mono dark:bg-slate-800 tracking-tighter text-green border border-gdarkGreen bg-white rounded-lg group cursor-pointer  active:scale-95 active:shadow-inner",
        className
      )}
    >
      

      {/* text name */}
      <span className="relative text-text dark:text-slate-200 ">
        {textName}
      </span>
    </button>
  );
};

export default CustomButton;