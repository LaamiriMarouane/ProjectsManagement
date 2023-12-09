import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getDemandToUpdate } from '../../../features/demandsSlice';

const UserDemandFrom = ({ isUpdate, demandId }) => {
    const dispatch = useDispatch();
    let demandToUpdate = {};
    dispatch(getDemandToUpdate(1));
    // useEffect(() => {
    //     if (isUpdate) {
    //         demandToUpdate = dispatch(getDemandToUpdate(demandId));
    //     }
    // }, [])

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset
    } = useForm(
        {
            defaultValues: {
                ...demandToUpdate
            }
        }
    );

    const [privacy, setPrivacy] = useState('public');

    const onSubmit = (data) => {
        console.log('send demand : ', data);
        if (isUpdate) {

        } else {

        }
        reset()
    }
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
                        {...register("projectName", { required: true })}
                    />
                    {errors.projectName && (
                        <span className="text-sm font-medium text-red-500">Project Name is required</span>
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
                        {...register("subProjectName", { required: true })}
                    />
                    {errors.subProjectName && (
                        <span className="text-sm font-medium text-red-500">Sub-Project Name is required</span>
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
                        <span className="text-sm font-medium text-red-500">Type is required</span>
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
                        <span className="text-sm font-medium text-red-500">Theme is required</span>
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
                    <span className="text-sm font-medium text-red-500">Description is required</span>
                )}
            </div>
            <div className="mb-2 w-full">
                <label className="block text-gray-900 text-xs font-bold mt-3 mb-2">
                    Privacy
                </label>
                <div className="flex items-center">
                    <label className="mr-2">
                        <input
                            type="radio"
                            value="public"
                            checked={privacy === 'public'}
                            onClick={() => setPrivacy('public')}
                            {...register("privacy", { required: true })}
                        />
                        <span className="ml-2 text-sm font-medium">Public</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="private"
                            checked={privacy === 'private'}
                            onClick={() => setPrivacy('private')}
                            {...register("privacy", { required: true })}
                        />
                        <span className="ml-2 text-sm font-medium">Private</span>
                    </label>
                </div>
                {errors.privacy && (
                    <span className="text-sm font-medium text-red-500">Privacy is required</span>
                )}
            </div>


            <button
                type="submit"
                className="text-white py-2 px-4 rounded w-full  focus:outline-none focus:shadow-outline-blue bg-btn"
                disabled={!isValid || isSubmitting}
            >
                {!isUpdate ? 'Send Demand' : 'Edit'}
            </button>
        </form>
    )
}

export default UserDemandFrom