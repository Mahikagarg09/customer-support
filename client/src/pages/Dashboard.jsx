import AdminPage from "../components/Admin/AdminPage";
import CustomerPage from "../components/Customer/CustomerPage";

const Dashboard = () => {
  // Check if the user is logged in
  if (!localStorage.getItem("branchInternational")) {
    window.location.href = "/login";
  }

  const isAdmin = JSON.parse(localStorage.getItem("branchInternational")).admin;
  return (
    <>
      {isAdmin ? <AdminPage /> : <CustomerPage />}
    </>
  );
};

export default Dashboard;
