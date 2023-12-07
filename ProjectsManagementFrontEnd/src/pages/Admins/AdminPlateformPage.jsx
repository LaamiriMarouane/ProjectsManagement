import React from 'react';
import { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import ListAcceptedProject from '../components/adminComponents/ListAcceptedProjects';
import { AiOutlinePoweroff } from 'react-icons/ai';

function formatDate(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

const initalListOfDemande = [
  {
    id: 0,
    projectName: '',
    user: '',
    status: false,
    type: '',
    theme: '',
    description: '',
    public: '',
    demandeCreatingtime: formatDate(new Date()),
    validationTime: null
  }
];

const AdminPlateformPage = () => {

  const [demandeList, setDemandeList] = useState([
    {
      id: 1,
      projectName: 'Dev Web',
      user: 'user-name',
      status: false,
      type: 'IT',
      theme: 'Développement',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias',
      public: true,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null
    },
    {
      id: 2,
      projectName: 'Dev Web',
      user: 'user-name',
      status: true,
      type: 'IT',
      theme: 'Développement',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias',
      public: true,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null
    },
    {
      id: 3,
      projectName: 'Dev Web',
      user: 'user-name',
      status: true,
      type: 'IT',
      theme: 'Développement',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias',
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null
    },
    {
      id: 4,
      projectName: 'Dev Web',
      user: 'user-name',
      status: true,
      type: 'IT',
      theme: 'Développement',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias',
      public: true,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null
    },
    {
      id: 5,
      projectName: 'Dev Web',
      user: 'user-name',
      status: false,
      type: 'IT',
      theme: 'Développement',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias',
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null
    },
    {
      id: 6,
      projectName: 'Dev Web',
      user: 'user-name',
      status: false,
      type: 'IT',
      theme: 'Développement',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias',
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null
    },
    {
      id: 7,
      projectName: 'Dev Web',
      user: 'user-name',
      status: false,
      type: 'IT',
      theme: 'Développement',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias',
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null
    },
    {
      id: 8,
      projectName: 'Dev Web',
      user: 'user-name',
      status: false,
      type: 'IT',
      theme: 'Développement',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias',
      public: false,
      demandeCreatingtime: formatDate(new Date()),
      validationTime: null
    },
  ]);

  const [listAcceptedProject, setListAcceptedProject] = useState([]);
  const [isListProjects, setIsListProject] = useState(false);
  const [isClosedProjects, setIsClosedProject] = useState(false);

  const handleApproval = (id, type) => {
    if (type === "accept") {
      const acceptedProjects = demandeList.find(item => item.id === id);
      acceptedProjects.validationTime = formatDate(new Date());
      setListAcceptedProject(prevAcceptedProjects => [...prevAcceptedProjects, acceptedProjects]);
      const newList = demandeList.filter(item => item.id !== id);
      setDemandeList(newList);
    } else if (type === "rejet") {
      const newList = demandeList.filter(item => item.id !== id);
      setDemandeList(newList);
    }
  }


  return (
    <div className="container mx-auto mt-16 my-8">
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div className='flex gap-3'>
          <button
            className="bg-blue-800 text-base font-semibold text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => setIsClosedProject(!isClosedProjects)}
          >
            <AiOutlinePoweroff />
            {isClosedProjects ? "Demandes Currentes" : "Projets Cloturés"}
          </button>
          <button
            className={`${isListProjects ? 'bg-blue-400' : 'bg-blue-800'} text-base font-semibold text-white px-4 py-2 rounded flex items-center gap-2`}
            onClick={() => setIsListProject(!isListProjects)}
          >
            <FaTableList />
            {isListProjects ? "Demandes Currentes" : "Liste des projets"}
          </button>
          <button
            className="bg-blue-800 text-base font-semibold text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <IoIosAddCircle size={20} />
            Créer un projet
          </button>
        </div>
      </div>
      {!isListProjects && <DemandeNotification handleApproval={handleApproval} demandeList={ demandeList.length !== 0 ? demandeList : initalListOfDemande } />}
      {isListProjects && <ListAcceptedProject data={listAcceptedProject} />}

    </div>
  );
};

export default AdminPlateformPage;


const DemandeNotification = ({ handleApproval = () => { }, demandeList = initalListOfDemande }) => {
  return <div className="px-48">
    <div className="rounded-lg border border-gray-300 bg-gray-50">
      <div className="bg-slate-200 px-3 py-1 border-b border-b-slate-300 rounded-tr-lg text-sm rounded-tl-lg">You have { demandeList[0].id !== 0 ? demandeList.length : 0 } notification </div>
      {
      demandeList.length !== 0 && demandeList[0].id !== 0 ?
      demandeList.map(
        demande => (
          <div key={demande.id} className="p-2 mb-2 border-b border-b-slate-400">
            <div className='border-b border-b-slate-300 pb-2'>
              <div className='flex items-center justify-between'>
                <h2 className="text-xl font-semibold"> {demande.projectName} </h2>
                <p className='text-lg text-gray-500'> {demande.user} </p>
              </div>
              <p className='text-base text-slate-400'> {demande.description} </p>
              <div className="flex items-center justify-between mt-2">
                <p className='text-base text-black '> Type : <span className="font-bold mr-3"> {demande.type} </span>  | Thème : <span className="font-bold"> {demande.theme} </span> </p>
                <p className='text-sm font-mono italic text-gray-500 float-right'> {demande.demandeCreatingtime} </p>
              </div>
            </div>
            <div className='mt-2 flex justify-between items-center'>
              <div>
                <button
                  className="bg-green-600 text-white px-3 py-1 mr-2 rounded"
                  onClick={() => handleApproval(demande.id, 'accept')}
                >
                  Accepter
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleApproval(demande.id, 'rejet')}
                >
                  Rejeter
                </button>
              </div>
              <span className='py-[3px] px-[9px] text-xs font-semibold uppercase text-center rounded-full shadow bg-slate-700 text-slate-100'> {demande.public ? 'public' : 'private'} </span>
            </div>
          </div>
        )
      )
      :
      <div className='text-center w-full py-3'>No Notification</div>
    }
    </div>
  </div>;
}