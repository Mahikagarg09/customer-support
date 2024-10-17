import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem("branchInternational");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoute;
