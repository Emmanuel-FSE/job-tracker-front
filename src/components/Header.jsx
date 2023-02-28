import React from "react";

export default function Header() {
  return (
    <div className="flex flex-row justify-around items-center bg-teal-600 font-bold p-4 text-gray-900 font-serif">
        <h1 className="text-3xl">"Job Tracker"</h1>
        <ul className="flex flex-row space-x-6">
            <li><a href="/jobs" className="hover:underline">Jobs</a></li>
            <li><a href="/applications" className="hover:underline">Applications</a></li>
            <li><a href="/login" className="hover:underline">LogOut</a></li>
        </ul>
    </div>
  );
}
