import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import TaskTable from "./TaskTable";

const Employee1 = () => {
    const [allocated,setAllocated]=useState(false);
    const [data,setData]=useState([]);

    useEffect(()=>{
        getData()
    },[data])

    const getData=async()=>{
        const response=await fetch("http://localhost:5000/get");
        const fetchedData=await response.json();
        setData(fetchedData);
    }

    const filteredData=data.filter((each)=>each.allocated===allocated);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 px-5">
      <h1 className="text-info text-center mb-5 mt-3">IAS Portal</h1>
      <Link to="/" className='align-self-end my-3'><button className='btn btn-danger'>Logout</button></Link>
      <h4 className="mb-3 text-secondary">Hey Admin, Welcome Back</h4>
      <div className="align-self-end">
      <button type="button" onClick={()=>setAllocated(false)} className={`btn mx-3 ${allocated?"":"btn-primary"}`}>Unallocated Tasks</button>
      <button type="button" onClick={()=>setAllocated(true)} className={`btn mx-3 ${allocated?"btn-primary":""}`}>Allocated Tasks</button>
      </div>
      {
        filteredData.length===0?(<h1 className="text-center text-secondary">No Tasks Available</h1>):
        (<TaskTable data={filteredData} allocated={allocated}/>)
      }
    </div>
  );
};

export default Employee1;
