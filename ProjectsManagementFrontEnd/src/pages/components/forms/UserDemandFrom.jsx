import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  PostCreateDemand,
  putUpdateDemand,
} from "../../../features/demandsSlice";

const UserDemandFrom = ({
  demandToUpdate,
  isUpdate,
  setIsUpdate,
  setAddDemand,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      ...demandToUpdate,
    },
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (isUpdate) {
      dispatch(putUpdateDemand(data));
      setIsUpdate({
        demandToUpdate: {},
        isUpdate: false,
      });
    } else {
      dispatch(PostCreateDemand(data));
      setAddDemand(false);
    }
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white px-8 py-5 rounded-xl shadow-sm shadow-blue-600"
    >
      <div className="flex w-full items-center justify-center mb-2 text-2xl font-bold">
        Create Project
      </div>

      <div className="flex items-center gap-5 justify-center">
        <div className="mb-1 w-full">
          <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
            Project Name
          </label>
          <input
            className=" appearance-none outline-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
            type="text"
            placeholder="ex: Research Project Management"
            {...register("projectLongName", { required: true })}
          />
          {errors.projectLongName && (
            <span className="text-sm font-medium text-red-500">
              Project Name is required
            </span>
          )}
        </div>
        <div className="mb-1 w-full">
          <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
            Sub-Project Name
          </label>
          <input
            className=" appearance-none outline-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
            type="text"
            placeholder="ex: project-manag"
            {...register("projectName", { required: true })}
          />
          {errors.projectName && (
            <span className="text-sm font-medium text-red-500">
              Sub-Project Name is required
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center">
        <div className="mb-1 w-full">
          <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
            Type
          </label>
          <input
            className=" appearance-none outline-none bg-transparent font-medium text-sm  w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
            type="text"
            placeholder="ex : IT"
            {...register("type", { required: true })}
          />
          {errors.type && (
            <span className="text-sm font-medium text-red-500">
              Type is required
            </span>
          )}
        </div>
        <div className="mb-1 w-full">
          <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
            Theme
          </label>
          <input
            className=" appearance-none outline-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
            type="text"
            placeholder="ex: Web Developement"
            {...register("theme", { required: true })}
          />
          {errors.theme && (
            <span className="text-sm font-medium text-red-500">
              Theme is required
            </span>
          )}
        </div>
      </div>
      <div className="mb-1 w-full">
        <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
          Description
        </label>
        <textarea
          className="appearance-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border border-gray-400 rounded-md"
          rows={2}
          placeholder="Project Description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-sm font-medium text-red-500">
            Description is required
          </span>
        )}
      </div>
      <div className="mb-2 w-full">
        <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
          Privacy
        </label>
        <div className="flex items-center">
          <label>
            <input
              type="checkbox"
              // value={false}
              {...register("public")}
              defaultChecked={watch("public")}
              onChange={(e) => setValue("public", e.target.checked)}
            />
            <span className="ml-2 text-sm font-medium">public</span>
          </label>
        </div>
        {errors.public && (
          <span className="text-sm font-medium text-red-500">
            Privacy is required
          </span>
        )}
      </div>

      <button
        type="submit"
        className="text-white py-2 px-4 rounded w-full  focus:outline-none focus:shadow-outline-blue bg-btn"
        disabled={!isValid || isSubmitting}
      >
        {!isUpdate ? "Send Demand" : "Edit"}
      </button>
    </form>
  );
};

export default UserDemandFrom;
