import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyProjects } from "../../../../features/project/projectSlice";
import Spinner from "../../../components/tools/Spinner";

const UserProjectsPage = () => {
  const { projects, projectsloading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProjects());
  }, []);
  return (
    <div className="mt-20">
      {projectsloading ? (
        <div className="w-full h-[30rem] flex items-center justify-center  ">
          <Spinner />
        </div>
      ) : projects.length === 0 ? (
        <div className=" w-full h-[30rem] flex items-center justify-center ">
          You have no project at the moment
        </div>
      ) : (
        <div className="mt-20   grid grid-cols-2 relative gap-4 ">
          {projects.map((project) => (
            <UserProjectsComponent key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProjectsPage;

const UserProjectsComponent = ({ project }) => {
  const {
    id,
    shortName,
    description,
    type,
    theme,
    longName,
    public: ispublic,
    active,
  } = project;
  return (
    <div className="max-w-3xl bg-white py-2 px-3 w-full rounded-md">
      <div className="flex items-start justify-between w-full mb-5">
        <div>
          <div className="text-lg font-bold">{shortName}</div>
          <div className="text-sm font-bold text-slate-400">{longName}</div>
        </div>
        <Link
          to={`/projects/${id}`}
          className="text-black underline flex items-center hover:text-blue-700"
        >
          <FaLink className="mr-2" />
          Show More
        </Link>
      </div>
      <div className="flex items-center justify-between w-full ">
        <div className="text-base font-semibold">
          {theme} - {type}
        </div>
        <div
          className={`text-sm italic font-semibold  ${
            active ? "text-green-400" : "text-red-400"
          }`}
        >
          {active ? "enabled" : "disabled"}
        </div>
      </div>
    </div>
  );
};
