import { React, useState } from "react";


import axios from "axios";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import logo from "../assets/logo.svg";
import "react-toastify/dist/ReactToastify.css";

function Login() {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setconfirmPassword] = useState()
  

axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()){
    axios.post('https://chat-app-api-red.vercel.app/register', {name, email, password})
    .then(result => {console.log(result);
        toast.success(
            "Account Created Successfully",
            toastOptions
        )
    })
    .catch(err => console.log(err))
    }
  }

const handleValidation = () => {


if(confirmPassword!==password){
    // alert("Password do not match");
  toast.error(
    "Password do not match",
    toastOptions
  );
  return false;
}   
else if (email === "") {
    toast.error("Email is required.", toastOptions);
    return false;
  }
  else if (name.length < 1) {
    toast.error(
      "Username should be greater than 1 characters.",
      toastOptions
    );
    return false;
  }
  else if (password.length < 2) {
    toast.error(
      "Password should be equal or greater than 8 characters.",
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
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="email"
                className="form-control rounded-0 bg-transparent text-white rounded-xl"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              Register
            </button>
            <p className="text-white mt-4 mb-2">Already Have an Account ?</p>
            <Link
              className="flex justify-center items-center p-2   bg-white text-black rounded-sm hover:bg-gray-500"
              to="/login"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
