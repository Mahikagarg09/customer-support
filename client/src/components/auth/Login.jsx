import { loginFields } from "../../constants/formFields";
import Input from "./Input";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../../routes";
import axios from "axios";
import { toast } from "react-toastify";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));


const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  // Handle Change
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  // Login API Integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginRoute, {
        username: loginState.username,
        password: loginState.password,
      });
      localStorage.setItem(
        "branchInternational",
        JSON.stringify(response.data.user)
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form className="mt-8 space-y-6 bg-white p-8 rounded-md" onSubmit={handleSubmit}>
      <div>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
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
          onSubmit={handleSubmit}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 mt-10"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
