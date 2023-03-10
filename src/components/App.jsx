import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import Application from "./Application";
import Job from "./Job";
import MyApplication from "./MyApplication"
import AddJob from "./AddJob";
import EditJob from "./EditJob";

function App() {
  const [id, setId] = useState(null);
  function userId(id){
    localStorage.setItem("id", id);
    setId(id)
  }

  console.log(id);
  return (
    <Routes>
      <Route path="/login" element={<Login userId={userId} />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/applications" element={<Application />}></Route>
      <Route path="/jobs/:id" element={<Job />}></Route>
      <Route path="/edit-job/:id" element={<EditJob />}></Route>
      <Route path="/my-applications" element={<MyApplication />}></Route>
      <Route path="/add-job" element={<AddJob />}></Route>
    </Routes>
  );
}

export default App;
