import React, { useState } from "react";
import Header from "./Header";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
    const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  function newJob(event) {
    event.preventDefault();
    fetch("http://localhost:9292/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Application send successfully. Yaay!!",
          icon: "info",
          timer: 2000
        });
        setTimeout(() => navigate("/"), 3000);
      })
      .catch((error) => {
        Swal.fire({
          title: "There was an error processing yor application!",
          icon: "error",
          timer: 2000
        });
      });
    setJob({
      title: "",
      description: "",
      company: "",
      location: "",
      salary: "",
    });
  }
  return (
    <section className="bg-gray-400">
      <Header />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Add a new job
            </h1>
            <form onSubmit={newJob} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={job.title}
                  onChange={(event) =>
                    setJob((prevState) => ({
                      ...prevState,
                      title: event.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Plant Operator"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Job description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={job.description}
                  onChange={(event) =>
                    setJob((prevState) => ({
                      ...prevState,
                      description: event.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="This is a job for a handy person"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Emmax_Ke"
                  value={job.company}
                  onChange={(event) =>
                    setJob((prevState) => ({
                      ...prevState,
                      company: event.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Kenya -Ngong-road"
                  value={job.location}
                  onChange={(event) =>
                    setJob((prevState) => ({
                      ...prevState,
                      location: event.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="salary"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  placeholder="120,000"
                  value={job.salary}
                  onChange={(event) =>
                    setJob((prevState) => ({
                      ...prevState,
                      salary: event.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 font-bold text-gray-800 p-2 rounded-lg"
              >
                Submit job.
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
