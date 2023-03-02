import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Swal from "sweetalert2";
import moment from "moment";

export default function Job() {
  let { id } = useParams();
  const navigate = useNavigate();
  let userId = localStorage.getItem("id");

  const [job, setJob] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:9292/jobs/applications/${id}`)
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, [id]);

  const [apply, setApply] = useState({
    applicant_name: "",
    description: "",
    user_id: userId,
  });

  function applyJob(e) {
    e.preventDefault();
    let formData = { ...apply, job_title: job.title, job_id: job.id };
    submit(formData);
  }

  function submit(data) {
    if (userId) {
      fetch("http://localhost:9292/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          Swal.fire({
            title: "Application send successfully. Yaay!!",
            icon: "info",
            timer: 2000,
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "There was an error processing yor application!",
            icon: "error",
            timer: 2000,
          });
        });
    } else {
      Swal.fire({
        title: "You have to be logged in to submit an application!",
        icon: "error",
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }

  return (
    <div className="bg-gray-400">
      <Header />
      <div className="p-10 text-xl bg-white font-bold font-serif rounded shadow-lg">
        <h1 className="text-3xl text-center mb-2 underline font-sans font-bold">
          {job.title}
        </h1>
        <p>
          As a job seeker, finding the right employment opportunity can be a
          daunting task. With so many options available, it can be challenging
          to know where to start. That's where we come in. Our website is
          dedicated to helping you find the job that best matches your skills
          and experience. We offer a comprehensive database of job listings
          across various industries and job types, all in one convenient
          location.
        </p>
        <p>
          Our platform is user-friendly and easy to navigate, with powerful
          search and filtering options that allow you to find the perfect job
          quickly and easily. Whether you're just starting your career or
          looking for a change, we're here to help you take the next step
          towards your dream job.
        </p>
      </div>
      <div className="flex md:flex-row sm:flex-col">
        <div className="p-10">
          <div
            href={`/jobs/${job.id}`}
            className="rounded bg-white overflow-hidden shadow-lg w-96"
          >
            <img
              className="w-full h-72"
              src={`https://source.unsplash.com/random/800x600?job&${job.id}`}
              alt="Mountain"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{`Job Title: ${job.title}`}</div>
              <p className="text-gray-700 text-base">{job.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {`Company: ${job.company}`}
              </span>
              <span className="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {`Location: ${job.location}`}
              </span>
              <span className="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {`Salary => Ksh: ${job.salary}`}
              </span>
              <span className="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Posted: {moment(job.created_at).fromNow()}
              </span>
            </div>
          </div>
        </div>
        <div className="p-10">
          <h2 className="text-3xl font-bold underline">Applicants</h2>
          <div className="mt-3 space-y-2">
            {applications.map((application) => {
              return (
                <div
                  key={application.id}
                  className="rounded bg-white overflow-hidden shadow-lg"
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{`Applicant name: ${application.applicant_name}`}</div>
                    <p className="text-gray-700 text-base">
                      {application.description}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {`Job Title: ${application.job_title}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full p-10">
        <h2 className="text-3xl text-center p-2 underline">
          Apply for the job
        </h2>
        <form
          onSubmit={applyJob}
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
              value={apply.applicant_name}
              onChange={(event) =>
                setApply((prevState) => ({
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
              value={apply.description}
              onChange={(event) =>
                setApply((prevState) => ({
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
    </div>
  );
}
