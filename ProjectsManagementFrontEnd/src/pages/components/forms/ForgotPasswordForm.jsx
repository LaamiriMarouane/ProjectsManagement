import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isEmailSent, setIsEmailSent] = useState({
    success: false,
    sent: false,
  });
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (values) => {
    // console.log(values);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/v1/forgot-password",
        values
      );
      if (res.status == 200) {
        setIsEmailSent({
          success: true,
          sent: true,
        });
      } else {
        setIsEmailSent({
          success: false,
          sent: true,
          message: "something happend wrong",
        });
      }
    } catch (error) {
      setLoading(false);
      setIsEmailSent({
        success: false,
        sent: true,
        message: error.message,
      });
      setLoading(true);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-md mx-auto mt-8 bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="flex w-full items-center justify-center p-2 text-2xl font-bold">
        Forgot Password!
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mt-3 mb-2">
          Email
        </label>
        <input
          className=" appearance-none outline-none bg-transparent w-full py-2 px-3 textgray-700 leading-tight border-b border-gray-400"
          type="email"
          placeholder="example@gmail.com"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500">Email is required</span>
        )}
      </div>

      <button
        type="submit"
        className="text-white py-2 px-4 rounded w-full  focus:outline-none focus:shadow-outline-blue bg-btn"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPassword;
