import { Link } from "react-router-dom";

const Header = ({ heading, paragraph, linkName, linkUrl = "#" }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt="logo"
          className="h-14 w-14"
          src="https://cdn-icons-png.flaticon.com/512/10342/10342464.png"
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default Header;
