const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

const Input = ({
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
  
  return (
    <div className="my-5 relative">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        value={value}
        id={id}
        name={name}
        type="password"
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
      />
      <span
          className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
        ></span>
    </div>
  );
};

export default Input;
