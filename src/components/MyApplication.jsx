import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function Home() {
  const [applications, setApplications] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [edit, setEdit] = useState({
    applicant_name: "",
    description: "",
    id: ""
  });

  let userId = localStorage.getItem("id");

  useEffect(() => {
    fetch(`http://localhost:9292/users/applications/${userId}`)
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, [userId]);

  function handleEdit(e) {
    setIsShown(true);
     const appToEdit = applications.filter((application) => application.id === parseInt(e.target.id));
     console.log(appToEdit)
     setEdit((prevState) => ({
      ...prevState,
      applicant_name: appToEdit[0].applicant_name,
      description: appToEdit[0].description,
      id: appToEdit[0].id
    }))
  }

  function submitEdit(event){
    event.preventDefault();
    console.log(edit)
    fetch(`http://localhost:9292/applications/${edit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Application send successfully. Yaay!!")
      })
      .catch((error) => {
        alert("There was an error processing your application edit!")
      });

      setTimeout(() => {
        setIsShown(false);
      }, 1000);
  }

  function handleDelete(event) {
    event.preventDefault();
    fetch(`http://localhost:9292/applications/${event.target.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then();
  }

  const applicationsDiv = applications.map((application) => {
    return (
      <div
        key={application.id}
        className="rounded bg-white overflow-hidden shadow-lg"
      >
        <img
          className="w-full"
          src={`https://source.unsplash.com/random/800x600?person&${application.id}`}
          alt="Mountain"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{`Applicant name: ${application.applicant_name}`}</div>
          <div className="flex flex-row justify-around">
            <a href="#form"
              onClick={handleEdit}
              id={application.id}
              className="bg-green-600 cursor-pointer px-4 py-1 rounded"
            >
              Edit
            </a>
            <span
              onClick={handleDelete}
              id={application.id}
              className="bg-red-600 cursor-pointer px-4 py-1 rounded"
            >
              Delete
            </span>
          </div>
          <p className="text-gray-700 text-base">{application.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`Job Title: ${application.job_title}`}
          </span>
        </div>
      </div>
    );
  });

  const noApplications = (
    <div className="mt-52 text-xl font-serif font-bold text-red-500">
      <p>No applications available for you.</p>
      <p>You have not applied for a job yet.</p>
    </div>
  );

  return (
    <div className="bg-gray-400">
      <Header />
      <div className="p-10 text-xl font-bold font-serif rounded shadow-lg">
        <h1 className="text-3xl text-center mb-2 underline font-sans font-bold">
          My Applications Profile
        </h1>
        <p>
          Our team is committed to bringing you the latest and most up-to-date
          job listings from top employers, both locally and internationally. You
          can filter your search based on your preferences, such as location,
          job type, salary range, and experience level, to make your job hunt
          more efficient and effective.
        </p>
        <p>
          Once you find a job that matches your criteria, you can easily apply
          for it directly through our website. We offer a seamless application
          process that allows you to upload your resume and cover letter and
          track your application status.
        </p>
      </div>
      <div></div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {applications.length > 0 ? applicationsDiv : noApplications}
      </div>

      {isShown && (
        <div id="form" className="w-full p-10">
          <form
             onSubmit={submitEdit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="applicant_name"
              >
                Your name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="applicant_name"
                type="text"
                name="applicant_name"
                placeholder="applicant_name"
                value={edit.applicant_name}
                onChange={(event) =>
                  setEdit((prevState) => ({
                    ...prevState,
                    applicant_name: event.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                description
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                name="description"
                value={edit.description}
                onChange={(event) =>
                  setEdit((prevState) => ({
                    ...prevState,
                    description: event.target.value,
                  }))
                }
                required
                placeholder="Why do you want this job"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 font-bold text-gray-800 p-2 rounded-lg"
            >
              Submit Application
            </button>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Job Tracker. All rights reserved.
          </p>
        </div>
      )}
    </div>
  );
}
