import React from "react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import ListAcceptedProject from "../../../components/adminComponents/ListAcceptedProjects";
import { AiOutlinePoweroff } from "react-icons/ai";
import DemandComponent from "../../../components/adminComponents/DemandComponent";
import { Link } from "react-router-dom";
import AdminCommandComponent from "../../../components/adminComponents/AdminCommandComponent";

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
function AdminPlateformAcceptedDemandsPage() {
  const [demandeList, setDemandeList] = useState([
    {
      id: 1,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: true,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null,
    },
    {
      id: 2,
      projectName: "Dev Web",
      user: "user-name",
      status: true,
      type: "IT",
      theme: "Développement",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: true,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null,
    },
    {
      id: 3,
      projectName: "Dev Web",
      user: "user-name",
      status: true,
      type: "IT",
      theme: "Développement",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null,
    },
    {
      id: 4,
      projectName: "Dev Web",
      user: "user-name",
      status: true,
      type: "IT",
      theme: "Développement",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: true,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null,
    },
    {
      id: 5,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null,
    },
    {
      id: 6,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null,
    },
    {
      id: 7,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null,
    },
    {
      id: 8,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null,
    },
  ]);

  return (
    <div className="container mx-auto mt-16 my-8">
      <AdminCommandComponent/>

      <div className="px-48">
        <div className="rounded-lg  ">
          {demandeList.length !== 0 && demandeList[0].id !== 0 ? (
            demandeList.map((demand) => (
              <DemandComponent Key={demand.id} demand={demand} demandType={ 'accept' } />
            ))
          ) : (
            <div className="text-center w-full py-3">No Notification</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPlateformAcceptedDemandsPage;
