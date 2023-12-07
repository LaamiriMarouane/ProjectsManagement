import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaTrash, FaEdit, FaLock, FaSave } from 'react-icons/fa';


const ListAcceptedProjectsComponent = ({ data=[] }) => {
  const [updatedData, setUpdatedData] = useState(data);
  const [editingCellId, setEditingCellId] = useState(null);


  const columns = [
    { field: 'projectName', headerName: 'Nom_Projet', minWidth: 150 ,  editable: true, },
    { field: 'user', headerName: 'utilisateur', minWidth: 150 ,  editable: true, },
    { field: 'status', headerName: 'Status', minWidth: 150 ,  editable: true,
    renderCell: (params) => (
      <span className={params.value ? 'py-1 px-2 text-xs uppercase bg-green-200 text-green-600 font-semibold italic rounded-full shadow shadow-black' : 'py-1 px-2 text-xs uppercase bg-red-200 text-red-600 font-semibold italic rounded-full shadow shadow-black'}>
        {params.value ? 'enable' : 'disable'}
      </span>
    ), },
    { field: 'type', headerName: 'Type', minWidth: 150 ,  editable: true, },
    { field: 'theme', headerName: 'Theme', minWidth: 150 ,  editable: true, },
    { field: 'description', headerName: 'Description', minWidth: 150, editable: true, },
    { field: 'public', headerName: 'Accessibilité', minWidth: 150 , editable: true, },
    { field: 'validationTime', headerName: 'Date_Validation', width: 220, editable: true, },
    { field: 'demandeCreatingtime', headerName: 'Date_Dommande', minWidth: 250,  editable: true, },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className='flex gap-3'>
          <FaTrash
            onClick={() => handleDelete(params.row.id)}
            style={{ cursor: 'pointer', marginRight: '5px' }}
            size={17}
          />
          {params.row.id === editingCellId ? (
            <FaSave
              onClick={() => handleSave(params.row.id)}
              style={{ cursor: 'pointer', marginRight: '5px' }}
              size={17}
            />
          ) : (
            <FaEdit
              onClick={() => handleEdit(params.row.id)}
              style={{ cursor: 'pointer', marginRight: '5px' }}
              size={17}
            />
          )}
          <FaLock
            onClick={() => handleCloseProject(params.row.id)}
            style={{ cursor: 'pointer' }}
            size={17}
          />
        </div>
      ),
    },
  ];

  const dataWithIds = updatedData.map((item, index) => ({ ...item, id: index + 1 }));

  const handleDelete = (id) => {
    console.log(`Supprimer la ligne avec l'ID ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Modifier la ligne avec l'ID ${id}`);
    setEditingCellId(id);
  };

  const handleSave = (id) => {
    console.log(`Enregistrer les changements de la ligne avec l'ID ${id}`);
    setEditingCellId(null);
  };

  const handleCloseProject = (id) => {
    console.log(`Clôturer le projet avec l'ID ${id}`);
  };

  const handleCellEditCommit = (params) => {
    if (params.id !== editingCellId) {
      setEditingCellId(params.id);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onCellEditCommit={(params) => handleCellEditCommit(params)}
        editable
      />
    </div>
  )
}

export default ListAcceptedProjectsComponent