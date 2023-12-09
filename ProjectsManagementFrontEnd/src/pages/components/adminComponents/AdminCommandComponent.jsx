import React from 'react'
import { Link } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoMdRemove } from "react-icons/io";



const AdminCommandComponent = () => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="flex gap-3">
                <button className="bg-blue-800 text-base font-semibold text-white px-4 py-2 rounded flex items-center gap-2">
                    <IoMdAdd />
                    <Link to={"/admin/demands/new"}> New Demandes</Link>
                </button>
                <button className="bg-blue-800 text-base font-semibold text-white px-4 py-2 rounded flex items-center gap-2">
                    <FaCheck />
                    <Link to={"/admin/demands/accepted"}>Accepted Demands</Link>
                </button>
                <button
                    className={`${false ? "bg-blue-400" : "bg-blue-800"} text-base font-semibold text-white px-4 py-2 rounded flex items-center gap-2`}
                >
                    <IoMdRemove />
                    <Link to={"/admin/demands/rejected"}>Rejected Demandes</Link>
                </button>
            </div>
        </div>
    );
}

export default AdminCommandComponent