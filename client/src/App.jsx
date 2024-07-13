import { useState } from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;