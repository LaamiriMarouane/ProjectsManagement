import React, { useEffect } from "react";
import ProjectDetailsComponent from "../components/project/ProjectDetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectDetails } from "../../features/project/projectSlice";
import Spinner from "../components/tools/Spinner";

const ProjectDetailsPage = () => {
  const { project, projectsError, projectsloading } = useSelector(
    (state) => state.project
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProjectDetails(id));
  }, []);
  //haddle errors
  // useEffect(() => {
  //   if (!projectsloading && projectsError !== "") {
  //     navigate("/error", { state: { projectsError } });
  //   }
  // }, [projectsloading, projectsError]);
  return (
    <div className="h-full w-full ">
      {projectsloading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
          <Spinner />
        </div>
      ) : (
        <ProjectDetailsComponent prorjectDetails={project} />
      )}
    </div>
  );
};

export default ProjectDetailsPage;
