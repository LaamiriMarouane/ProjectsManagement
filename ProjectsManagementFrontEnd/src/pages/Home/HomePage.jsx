import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaLink,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import Filter from "../../utils/Filter";
import { Link } from "react-router-dom";
import { getAllPublicProjects } from "../../features/project/projectSlice";

const HomePage = () => {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  // const [filterType, setFilterType] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 2;

  // const projectTypes = Array.from(
  //   new Set(projects.map((project) => project.type))
  // );
  // const projectThemes = Array.from(
  //   new Set(projects.map((project) => project.theme))
  // );

  // const filteredProjects = filterType
  //   ? projects.filter((project) => project.type === filterType)
  //   : projects;

  // const sortedProjects = [...filteredProjects].reverse((a, b) => {
  //   let x = b.demandeCreatingtime.split(",");
  //   let y = a.demandeCreatingtime.split(",");
  //   if (y[0] === x[0]) {
  //     return x[1] - y[1];
  //   }
  //   return x[0] - y[0];
  // });

  // // Calculate the indexes of the current page
  // const indexOfLastProject = currentPage * itemsPerPage;
  // const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  // const currentProjects = sortedProjects.slice(
  //   indexOfFirstProject,
  //   indexOfLastProject
  // );

  // const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };
  useEffect(() => {
    dispatch(getAllPublicProjects());
  }, []);

  return (
    <div className="container max-w-[1200px] mx-auto mt-20 ">
      {/* <Filter types={projectTypes} onFilterChange={setFilterType} themes={projectThemes} /> */}
      <div className="mb-8 w-full">
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-white px-4 py-2 rounded shadow">
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
                  to={"/details"}
                  className="text-black underline flex items-center hover:text-blue-700"
                >
                  <FaLink className="mr-2" />
                  Show More
                </Link>
                <em className="text-sm text-gray-500 mb-1">
                  added on {project.demandeCreatingtime}
                </em>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-4 items-center">
          <button
            // onClick={() => handlePageChange(currentPage - 1)}
            // disabled={currentPage === 1}
            className="py-3 px-3 bg-gray-300 hover:bg-gray-500 disabled:bg-gray-50 disabled:text-gray-200 rounded-full"
          >
            <FaLongArrowAltLeft size={20} />
          </button>
          <span className="mx-4 text-sm font-bold text-black">
            <span className="py-2 px-3.5 bg-slate-400 rounded-full">
              {/* {currentPage} */}
            </span>{" "}
            {/* / {totalPages} */}
          </span>
          <button
            // onClick={() => handlePageChange(currentPage + 1)}
            // disabled={currentPage === totalPages}
            className="py-3 px-3 bg-gray-300 hover:bg-gray-500 disabled:bg-gray-50 disabled:text-gray-200 rounded-full"
          >
            <FaLongArrowAltRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
