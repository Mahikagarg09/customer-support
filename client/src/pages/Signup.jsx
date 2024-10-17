import Header from "../components/auth/Header";
import SignupComp from "../components/auth/Signup";


const Signup = () => {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-md w-full space-y-8">
    <Header
      heading="Signup to create an account"
      paragraph="Already have an account? "
      linkName="Login"
      linkUrl="/login"
    />
        <SignupComp/>
      </div>
    </div>
  );
};

export default Signup;
