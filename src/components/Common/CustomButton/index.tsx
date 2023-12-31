import type { CustomButtonProps } from "@/types";

const CustomButton: React.FC<CustomButtonProps> = ({ children, disabled = false, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`rounded p-2 text-white focus:bg-gray-600 focus:outline-none ${
        disabled ? "cursor-not-allowed bg-gray-500 hover:bg-gray-400" : "cursor-pointer bg-gray-700 hover:bg-gray-600"
      } ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
