import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout(e){
    e.preventDefault();
    localStorage.removeItem("id");
    setTimeout(() => navigate("/login"), 1000);
  }
  return (
    <div className="flex flex-row justify-around items-center bg-teal-600 font-bold p-4 text-gray-900 font-serif">
        <h1 className="text-3xl">"Job Tracker"</h1>
        <ul className="flex flex-row space-x-6">
            <li><a href="/" className="hover:underline">Jobs</a></li>
            <li><a href="/applications" className="hover:underline">All applications</a></li>
            <li><a href="/my-applications" className="hover:underline">My applications</a></li>
            <li onClick={handleLogout} className="hover:underline">LogOut</li>
        </ul>
    </div>
  );
}
