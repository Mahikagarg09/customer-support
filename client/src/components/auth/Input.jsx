import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";

const Input = ({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="my-5 relative">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={isPasswordVisible && type === "password" ? "text" : type}
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
      />
      {type === "password" && (
        <span
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
        >
          {isPasswordVisible ? (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
          )}
        </span>
      )}
    </div>
  );
};

export default Input;
