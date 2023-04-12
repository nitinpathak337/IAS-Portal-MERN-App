import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("Customer");

  const navigate=useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Username and Password should not be blank");
    } else {
      validate();
    }
  };

  const validate = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        password: password,
        type: type,
      }),
    });
    if(response.status===200){
        const data=await response.text();
        successLogin(data)
    }
    else{
        const msg=await response.text();
        alert(msg);
    }
  };

  const successLogin=(userType)=>{
       if(userType==="customer"){
        navigate("/customer")
       }
       else if(username==="employee1"){
        navigate("/employee1");
       } 
       else if(username==="employee2"){
        navigate("/employee2")
       }
    
  }

  return (
    <div className="App">
      <div
        className={`d-flex flex-column align-items-center justify-content-center`}
      >
        <h1 className="text-center text-info mb-3">IAS Portal</h1>
        <form className="border rounded p-4">
          <h3 className="text-secondary text-center m-2">Log In</h3>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="select">Choose User Type</label>
            <select
              id="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Customer">Customer</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={loginHandler}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
