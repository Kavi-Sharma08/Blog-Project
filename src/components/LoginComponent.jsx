import authService from "../appwrite/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Logo } from "../components";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/authSlice";

const Login = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      setError("");
      const session = await authService.login(data);
      if (session) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(authLogin(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message); // fix: typo in `error.message`
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-cyan-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 sm:p-10 border border-gray-200">
        <div className="mb-6 text-center">
          
          <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="space-y-5">
          <Input
            label="Email"
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
            className = "mx-3"
            type="password"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
