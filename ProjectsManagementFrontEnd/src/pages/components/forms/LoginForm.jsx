import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const hashedPassword = "hash_of_your_actual_password";
    const isPasswordValid = bcrypt.compareSync(data.password, hashedPassword);

    if (isPasswordValid) {
      console.log("Login successful");
    } else {
      console.log("Invalid password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 bg-white p-8 rounded shadow-md"
    >
      <div className="flex w-full items-center justify-center p-2 text-xl font-bold">
        Login
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 textgray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="example@gmail.com"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
        />
        {(errors.email && (
          <span className="text-red-500">Email is required</span>
        )) ||
          (errors?.email?.type === "pattern" && (
            <p className="text-red-500">Please write correct email address</p>
          ))}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 textgray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="********"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500">Password is required</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
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
