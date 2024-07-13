// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://chat-app-api-atharvarakshaks-projects.vercel.app/register', { name, email, password })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary" style={{ height: '100vh' }}>
      {/* <h1>Hello</h1> */}
      <div className="bg-white p-3 rounded w-30">
        <h2>Register</h2>
        <form >
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          <p>Already Have an Account</p>
          <button type="button" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
