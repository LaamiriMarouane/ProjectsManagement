import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSearchUsers } from "../../../features/userSlice";

function UsersFilterForm() {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();
  const { users, loading } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    if (searchTerm) {
      dispatch(getSearchUsers(searchTerm));
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center  ">
        <label className=" text-transparent text-xs font-bold mt-3 mb-2">
          search
        </label>
        <div className="flex flex-row items-center gap-3  ">
          <input
            className=" appearance-none outline-none bg-transparent font-medium text-sm w-full py-1 px-2 textgray-700 leading-tight border-b border-gray-400"
            type="text"
            placeholder="search"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-sm font-medium text-red-500">
              username is required
            </span>
          )}
          <div>
            <button
              type="submit"
              className="text-white py-px px-4 rounded w-full  focus:outline-none focus:shadow-outline-blue bg-btn"
              disabled={!isValid || isSubmitting}
            >
              search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UsersFilterForm;
