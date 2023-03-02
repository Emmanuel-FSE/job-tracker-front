import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Header() {
  const navigate = useNavigate();
  let userId = localStorage.getItem("id")

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("id");
    setTimeout(() => navigate("/login"), 1000);
  }
  function myApplications() {
    let userId = localStorage.getItem("id");
    if (userId) {
      navigate("/my-applications");
    } else {
      Swal.fire({
        title: "You have to be logged in to view your applications!",
        icon: "info",
        timer: 2000
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }
  return (
    <div className="flex flex-row justify-around items-center bg-lime-400 font-bold p-4 text-gray-900 font-serif">
      <h1 className="text-3xl">"Job Tracker"</h1>
      <ul className="flex flex-row space-x-6">
        {11 === parseInt(userId) ? <li><NavLink to="/add-job" className="hover:underline">Add Job</NavLink></li> : ""}
        <li>
          <NavLink to="/" exact className="hover:underline">
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink to="/applications" exact className="hover:underline">
            All applications
          </NavLink>
        </li>
        <li onClick={myApplications} className="hover:underline">
          My applications
        </li>
        <li onClick={handleLogout} className="hover:underline">
          LogOut
        </li>
      </ul>
    </div>
  );
}
