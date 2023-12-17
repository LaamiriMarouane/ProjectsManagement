import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UsersFilterForm from "../../components/forms/UsersFilterForm";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../features/userSlice";

const image =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
const colunms = [
  // {
  //   field: "id",
  //   headerName: "Number",
  //   filterable: false,
  //   renderCell: (index) =>
  //     index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
  // },
  {
    field: "image",
    headerName: "Image",
    sortable: false,
    filterable: false,
    disableExport: false,
    renderCell: (params) => (
      <img
        className=" hover:z-20 rounded-full h-10 w-10 object-cover object-center transition-transform transform origin-center hover:scale-[3]"
        src={image}
        alt=""
      />
    ),
  },
  { field: "username", headerName: "UserName", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "firstName", headerName: "FirstName", flex: 1 },
  { field: "lastName", headerName: "LastName", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    disableExport: false,

    renderCell: (params) => <div>actions</div>,
  },
];
function AdminPlateformAppUsersPage() {
  const { users, loading } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  useEffect(() => {
    dispatch(getUsers(paginationModel));
  }, [paginationModel]);
  useEffect(() => {
    console.log(paginationModel);
  }, [paginationModel]);
  return (
    <div className="container mx-auto mt-16 my-8">
      <div className="w-full flex flex-row items-center gap-5 justify-between bg-zinc-100 my-4 px-8 py-5 rounded shadow">
        <div>
          <h1 className="text-4xl font-bold text-blue-900">Users Table</h1>
        </div>
        <UsersFilterForm />
      </div>
      <div className="h-[600px]">
        <div className="box-border max-w-full bg-zinc-100 rounded shadow h-full ">
          <DataGrid
            columns={colunms}
            rows={users.users}
            rowCount={users.totalRows}
            loading={loading}
            slots={{ toolbar: GridToolbar }}
            pagination
            paginationMode="server"
            pageSizeOptions={[5, 10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          ></DataGrid>
        </div>
      </div>
    </div>
  );
}

export default AdminPlateformAppUsersPage;
