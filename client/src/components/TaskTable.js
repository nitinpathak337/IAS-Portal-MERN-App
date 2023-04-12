
import Popup from 'reactjs-popup';
import React, { useState } from 'react'

const TaskTable = (props) => {
    const {data,allocated}=props;
    const [task,setTask]=useState([]);
    

    const getTaskDetails=async(id)=>{
        const response=await fetch(`http://localhost:5000/get/${id}`)
        const task=await response.json();
        setTask(task);
    }

    const assignTaskhandler=async(id)=>{
        const response=await fetch(`http://localhost:5000/assign/${id}`,{
            method:"put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        
              body: JSON.stringify({
                employee:"Employee2"
              }),
            });
        const msg=await response.text();
        alert(msg);
    }

  return (
    <div>
    {allocated===true?(
       <table className="table table-striped text-center my-5">
       <thead>
         <tr className="bg-info text-white">
           <th>Employee Username</th>
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
                <th>{each.employee}</th>
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

                                
                                
                                <div>
                                <button onClick={close} className="btn btn-danger my-3">Close</button>
                                
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
    ):(
        <table className="table table-striped text-center my-5">
        <thead>
          <tr className="bg-info text-white">
            <th>Customer Username</th>
            <th>Product Type</th>
            <th>Issue Type</th>
            <th>Date of Submission</th>
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
                                <h3 className='text-center text-secondary'>Request Details</h3>
                                <div className='card p-3'>
                                <p>{`Customer Name : ${task[0].name}`}</p>
                                <p>{`Product Type : ${task[0].product}`}</p>
                                <p>{`Issue Type : ${task[0].issue}`}</p>
                                <p>{`Description : ${task[0].description}`}</p>
                                <p>{`Submission Date : ${task[0].date.slice(0,10)}`}</p>
                                </div>

                                <label className='my-3' htmlFor='select'>Assign to an employee</label>
                                <select className='mb-4' id="select" >
                                    
                                    <option value="Employee2">Employee2</option>
                                </select>
                                <div>
                                <button onClick={close} className="btn btn-danger ">Close</button>
                                <button onClick={()=>assignTaskhandler(each._id)} className="btn btn-primary mx-3">Assign</button>
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
    )}
    </div>
  )
}

export default TaskTable

