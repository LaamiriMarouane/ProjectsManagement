import React, { useEffect } from "react";
import ProjectDetailsComponent from "../../../components/project/ProjectDetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../../../../features/project/projectSlice";

const prorjectDetails = {
  id: 1,
  projectName: "Dev Web",
  projectLongName: "Dev Web for testing",
  user: "Hamza ELKADDARI",
  status: false,
  type: "IT",
  theme: "Développement",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias, Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
  public: true,
  creatingtime: "01/09/2023",
};
const ProjectDetailsPage = () => {
  const { project } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProjectDetails(id));
    console.log("test", project);
  }, []);
  return (
    <div className="h-full w-full ">
      {project && <ProjectDetailsComponent prorjectDetails={project} />}
    </div>
  );
};

export default ProjectDetailsPage;
