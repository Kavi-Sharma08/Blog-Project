import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";
import { Input, Button, Logo } from "../components";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const signUp = async (data) => {
    try {
      setError("");
      const userData = await authService.createAccount(data);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-cyan-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 sm:p-10 border border-gray-200">
        <div className="mb-6 text-center">
          
          <h2 className="text-3xl font-extrabold text-gray-800">Create an Account</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(signUp)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="John Doe"
            className = "mx-3"
            {...register("name", { required: true })}
          />

          <Input
            label="Email Address"
            placeholder="example@domain.com"
            className = "mx-3"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email address",
              },
            })}
          />

          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            className = "mx-3"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
