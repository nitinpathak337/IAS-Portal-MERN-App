
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup'; 
import Select from 'react-select';
import "./Customer.css";

const productTypeArr=["Mobile Phone","TV","Refrigerator","Washing Machine"];
const mobileOptions=[{value:"Broken Screen",label:"Broken Screen"},{value: "Faulty Camera",label:"Faulty Camera"},{value:"Overheating Issue",label:"Overheating Issue"}];
const tvOptions=[{value:"Damaged Screen",label:"Damaged Screen"},{value:"Discoloration Of Screen",label:"Discoloration Of Screen"},{value:"Adapter Issues", label:"Adapter Issues"}];
const refrigeratorOptions=[{value:"Panel Controls Broken",label:"Panel Controls Broken"},{label:"Compressor Not Working",value:"Compressor Not Working"},{label:"Unable To Turn On",value:"Unable To Turn On"}];
const washingMachineOptions=[{value:"Water Overflowing",label:"Water Overflowing"},{value:"Motor Not Working",label:"Motor Not Working"}];

const Customer = () => {
    const [data,setData]=useState([]);
    const [productType,setProductType]=useState("Mobile Phone");
    const [issueType,setIssueType]=useState([]);
    const [description,setDescription]=useState("");
    const [document,setDocument]=useState(null);

    useEffect(()=>{
         getData();   
    },[data]);

    const getData=async()=>{
        const response=await fetch("http://localhost:5000/get");
        const fetchedData=await response.json();
        setData(fetchedData);
    }

    const multiSelectChangeHandler=(issueType)=>{
        setIssueType(issueType);
    }

    const clearValues=()=>{
        setDescription("");
        setProductType("Mobile Phone");
        setIssueType([]);
    }

    

    const getOptions=()=>{
        switch(productType){
            case "Mobile Phone":
                return <Select options={mobileOptions} isMulti value={issueType} onChange={multiSelectChangeHandler} />
            case "TV":
                return <Select options={tvOptions} isMulti value={issueType} onChange={multiSelectChangeHandler}/>
            case "Refrigerator":
                return <Select options={refrigeratorOptions} isMulti value={issueType} onChange={multiSelectChangeHandler}/> 
            case "Washing Machine":
                return <Select options={washingMachineOptions} isMulti value={issueType} onChange={multiSelectChangeHandler}/>             
            default:
                return null    
        }
    }

    const submitRequestHandler=async(e)=>{
        e.preventDefault();
        if(document===null){
            alert("Policy Document is necessary to upload")
        }
        else{
        const response = await fetch("http://localhost:5000/post", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        product: productType,
        issue: issueType,
        description: description,
      }),
    });
    const msg=await response.text();
    alert(msg);
}
    }


  return (
    <div className='d-flex flex-column justify-content-center align-items-center py-5 px-5'>
        <h1 className='text-info text-center mb-5 mt-3'>IAS Portal</h1>
        <Link to="/" className='align-self-end my-3'><button className='btn btn-danger'>Logout</button></Link>
        <Popup modal trigger={<button type='button' className='btn btn-info align-self-end mr-5 mb-3'>Add New Request</button>}
        onClose={clearValues}
        >
        {(close) => (
          <>
            <form className="form">
                <h1 className='text-center text-secondary'>Add Request</h1>
                <label className='text-secondary my-2'>Product Type</label>
                <select value={productType} onChange={(e)=>{setProductType(e.target.value);setIssueType([])}} className='mb-3'>
                    {productTypeArr.map((each)=><option value={each} key={each}>{each}</option>)}
                </select>
                <label className='text-secondary my-2'>Issue Type</label>
                {
                    getOptions()
                }
                <label className='text-secondary my-2'>Issue Description</label>
                <textarea className='mb-3' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                <label className='text-secondary my-2'>Policy Upload</label>
                <input type='file' className='mb-3' onChange={(e)=>setDocument(e.target.value)}/>
                <div className='align-self-end'>
                <button onClick={(close)} type='button' className='btn btn-danger mx-3'>Close</button>
                <button onClick={submitRequestHandler} type='submit' className='btn btn-primary '>Submit</button>
                </div>
            </form>
            
            </>
        )}    
        </Popup>
        
        <h4 className='mb-3 text-secondary'>Hey Customer, Welcome Back</h4>
        <h4 className='mb-3 text-secondary'>Your Requests : </h4>
        {data.length===0?(<h1 className='text-center text-secondary'>Loading</h1>) :  
        (<ul>
            {
                data.map((each)=><li key={each._id} className='card p-3 my-3'>
                     <p>{`Product Type : ${each.product}`}</p>
                     <p>{`Issue Type : ${each.issue}`}</p>
                     <p>{`Description : ${each.description}`}</p>   
                </li>)
            }
        </ul>)
        }
    </div>
  )
}

export default Customer
