import Header from "../components/auth/Header";
import LoginComponent from "../components/auth/Login";

const Login = () => {

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet?"
          linkName="Signup"
          linkUrl="/signup"
        />
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
