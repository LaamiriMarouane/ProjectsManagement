import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authentication } from "../../../features/auth/authSlice";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(authentication(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="flex w-full items-center justify-center p-2 text-2xl font-bold">
        Se connecter
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
          Username
        </label>
        <input
          className=" appearance-none outline-none bg-transparent w-full py-2 px-3 textgray-700 leading-tight border-b border-gray-400"
          type="username"
          placeholder="username or email"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="text-red-600">Username is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
          Password
        </label>
        <input
          className=" appearance-none outline-none bg-transparent w-full py-2 px-3 textgray-700 leading-tight border-b border-gray-400"
          type="password"
          placeholder="********"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-600">Password is required</span>
        )}
      </div>

      <button
        type="submit"
        className=" text-white py-2 px-4 rounded w-full  focus:outline-none focus:shadow-outline-blue bg-btn"
      >
        Login
      </button>

      <div className="mt-4">
        <p className="text-sm">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-blue-500">
            Reset it here
          </Link>
          .
        </p>
        <p className="mt-2 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Create one here
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
