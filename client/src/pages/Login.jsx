import { React, useState } from "react";


import axios from "axios";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import logo from "../assets/logo.svg";
import "react-toastify/dist/ReactToastify.css";


function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

axios.defaults.withCredentials = true;

const handleSubmit = (e) => {
    e.preventDefault();
    

      if(handleValidation()){
      axios.post('https://chat-app-api-red.vercel.app/login', {email, password})
      .then(response => {
        if(!response.success){
          toast.error(
            "Invalid Email or Password",
            toastOptions
          );
        }
        if(response.success){
          toast.success(
            "Login Successfully",
            toastOptions
          );

          localStorage.setItem('chatUserEmail',email);
          localStorage.setItem('password',password);
          console.log(localStorage.getItem('authToken'));
          navigate('/');
        }
      })
      .catch(err=>console.log(err))

       
      
    

     }
}

const handleValidation = () => {


 if (email === "") {
    toast.error("Email is required.", toastOptions);
    return false;
  }

  else if (password.length < 2) {
    toast.error(
      "Enter valid password",
      toastOptions
    );
    return false;
  }
return true;



}
  return (
    <div className=" p-10 h-full w-full flex justify-center bg-slate-900  ">
      <div className="d-flex justify-content-center align-items-center bg-slate-950 w-80 rounded-lg">
        <div className=" p-3 rounded w-30 ">
          <div className="flex items-center justify-around">
            <img src={logo} alt="logo" className="h-14 w-14" />
            <h2 className="text-white text-2xl">Snappy Login</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center p-6"
          >
            
            <div className="mb-3">
              <label className="text-white" htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0 bg-transparent text-white rounded-xl"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="text-white" htmlFor="email">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0 bg-transparent text-white rounded-xl"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn text-white w-100 rounded-sm bg-violet-600 hover:bg-violet-400">
              Login
            </button>
            
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
