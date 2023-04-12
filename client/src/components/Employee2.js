import {Link} from 'react-router-dom';

import React, { useState,useEffect } from 'react'
import Popup from 'reactjs-popup';

const Employee2 = () => {
    const [data,setData]=useState([]);
    const [task,setTask]=useState([]);
    const [status,setStatus]=useState("In Progress");

    useEffect(()=>{
        getData()
    },[data])

    const getData=async()=>{
        const response=await fetch("http://localhost:5000/get");
        const fetchedData=await response.json();
        setData(fetchedData);
        
    }

    const getTaskDetails=async(id)=>{
        const response=await fetch(`http://localhost:5000/get/${id}`)
        const task=await response.json();
        setTask(task);
    }

    const changeStatusHandler=async(id)=>{
        const response=await fetch(`http://localhost:5000/status/${id}`,{
            method:"put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        
              body: JSON.stringify({
                status:status
              }),
            });
        const msg=await response.text();
        alert(msg);
    }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 px-5">
      <h1 className="text-info text-center mb-5 mt-3">IAS Portal</h1>
      <Link to="/" className='align-self-end my-3'><button className='btn btn-danger'>Logout</button></Link>
      <h4 className="mb-3 text-secondary">Hey Employee, Welcome Back</h4>
      <h4 className='mb-3 text-secondary'>My Tasks :</h4>
      <table className="table table-striped text-center my-5">
       <thead>
         <tr className="bg-info text-white">
           <th>Customer Username</th>
           <th>Product Type</th>
           <th>Issue Type</th>
           <th>Date of Submission</th>
           <th>Status</th>
           <th>Detials</th>
         </tr>
       </thead>
       
       <tbody>
        {data.map((each)=>(
            <tr key={each._id}>
                <th>{each.name}</th>
                <th>{each.product}</th>
                <th>{each.issue}</th>
                <th>{each.date.slice(0,10)}</th>
                <th>{each.status}</th>
                <th>
                    <Popup modal
                        trigger={<button type='button' className='btn btn-primary'>More Details</button>}
                        onOpen={()=>getTaskDetails(each._id)}   
                                       
                    >
                    {(close)=>(
                        <>
                           <form className="form">
                                {task.length===0?(<h1 className='text-center text-secondary'>Loading</h1>):(
                                <>    
                                <h3 className='text-center text-secondary'>Task Details</h3>
                                <div className='card p-3'>
                                <p>{`Customer Name : ${task[0].name}`}</p>
                                <p>{`Employee Assigned : ${task[0].employee}`}</p>
                                <p>{`Product Type : ${task[0].product}`}</p>
                                <p>{`Issue Type : ${task[0].issue}`}</p>
                                <p>{`Description : ${task[0].description}`}</p>
                                <p>{`Submission Date : ${task[0].date.slice(0,10)}`}</p>
                                <p>{`Status : ${task[0].status}`}</p>
                                </div>
                                <label htmlFor='status' className='my-3'>Change Status</label>
                                <select id='status' value={status} className='mb-3' onChange={(e)=>setStatus(e.target.value)}>
                                    <option value="In Progress">In Progress</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Completed">Completed</option>
                                </select>    
                                
                                
                                <div>
                                <button onClick={close} className="btn btn-danger ">Close</button>
                                <button onClick={()=>changeStatusHandler(each._id)} className="btn btn-primary mx-3">Change Status</button>
                                </div>
                                </>)
                                }       
                            </form> 
                        </>
                    )}
                    </Popup>
                 </th>
            </tr>
        ))}
        </tbody>
        </table> 
    </div>  
  )
}

export default Employee2
