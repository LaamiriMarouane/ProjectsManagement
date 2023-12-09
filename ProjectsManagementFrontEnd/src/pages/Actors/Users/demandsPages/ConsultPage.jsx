import React, { useEffect } from 'react'
import UserDemandComponent from '../../../components/userComponents/UserDemandComponent';
import AcceptedDemandComponent from '../../../components/userComponents/AcceptedDemandComponent';
import { useSelector } from 'react-redux';


const ConsultPage = () => {
    const { Demands } = useSelector((store) => store.demand);


    return (
        <div className="flex items-start mt-5 w-full divide-solid divide-x divide-gray-500">
            <div className="w-[50%] h-screen px-3">
                <div className="rounded-lg border border-slate-300 bg-slate-100">
                    <div className="bg-slate-200 px-3 py-1 border-b border-b-slate-300 rounded-tr-lg text-sm rounded-tl-lg">
                        You have {Demands[0].id !== 0 ? Demands.length : 0}{" "}
                        demand made{" "}
                    </div>
                    {Demands.length !== 0 && Demands[0].id !== 0 ? (
                        Demands.map((demande) => (
                            <UserDemandComponent Key={demande.id} demand={demande} />
                        ))
                    ) : (
                        <div className="text-center w-full py-3">No demand made</div>
                    )}
                </div>
            </div>
            <div className='w-[50%] h-screen px-3'>
                <div className="rounded-lg border border-slate-300 ">
                    <div className="bg-slate-200 px-3 py-1 border-b border-b-slate-300 rounded-tr-lg text-sm rounded-tl-lg">
                        You have 1 demand accepted
                    </div>
                    <AcceptedDemandComponent />
                    <AcceptedDemandComponent />
                    <AcceptedDemandComponent />
                </div>
            </div>
        </div>
    );
}

export default ConsultPage