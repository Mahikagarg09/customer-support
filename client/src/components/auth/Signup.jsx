import { signupFields } from "../../constants/formFields";
import Input from "./Input";
const fields = signupFields;

const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form className="mt-8 space-y-6 bg-white p-8 rounded-md" onSubmit={handleSubmit}>
      <div>
        {fields.map((field) => (
          <Input
            key={field.id}
            value={field.id}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <div className="flex items-center">
          <input
            id="isAdmin"
            name="isAdmin"
            type="checkbox"
            className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-300 rounded cursor-pointer"
          />
          <label
            htmlFor="isAdmin"
            className="ml-2 block text-sm font-medium text-blue-500"
          >
            Are you an Agent?
          </label>
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 mt-10"
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default Signup;
