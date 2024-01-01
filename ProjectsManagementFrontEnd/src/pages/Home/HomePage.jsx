import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaLink
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAllPublicProjects } from "../../features/project/projectSlice";
import Spinner from "../components/tools/Spinner";
import { Pagination } from "@mui/material";

const HomePage = () => {
  const { projects, projectsloading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(getAllPublicProjects());
  }, []);

  const sortedProjects = [...projects].sort((a, b) =>
    a.shortName.localeCompare(b.shortName)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = sortedProjects.slice(startIndex, endIndex);

  return (
    <div className="container max-w-[1200px] mx-auto mt-20 ">
      <div className="mb-8 w-full flex flex-col justify-between space-y-1 h-full" style={{ height : 'calc(100vh - 100px)' }}>
        <div className="space-y-3 overflow-auto">
          {projectsloading ? (
            <div className="w-full h-[30rem] flex items-center justify-center ">
              <Spinner />
            </div>
          ) : paginatedProjects.length === 0 ? (
            <div className="w-full h-[30rem] flex items-center justify-center">
              No Project at the moment
            </div>
          ) : (
            paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white px-4 py-2 rounded shadow w-full"
              >
                <h2 className="text-lg font-bold">{project.shortName}</h2>
                <p className="text-gray-600 mb-1 py-2 w-full border-t border-b border-slate-100">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Type:</span> {project.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-bold">Theme:</span> {project.theme}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 text-sm font-semibold">
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-black underline flex items-center hover:text-blue-700"
                  >
                    <FaLink className="mr-2" />
                    Show More
                  </Link>
                  <em className="text-sm text-gray-500 mb-1">
                    update on xxx
                    {/* {project.} */}
                  </em>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Pagination Controls */}
        <Pagination
        className="w-full flex items-center justify-center"
          count={Math.ceil(sortedProjects.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, newPage) => setCurrentPage(newPage)}
          shape="rounded"
        />
        {/* End pagination controls */}
      </div>
    </div>
  );
};

export default HomePage;
