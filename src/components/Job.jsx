import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function Job() {
  let { id } = useParams();

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

  console.log(applications);

  return (
    <div className="bg-gray-400">
      <Header />
      <div className="p-10 text-xl font-bold font-serif rounded shadow-lg">
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
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {`Company: ${job.company}`}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {`Location: ${job.location}`}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {`Salary => Ksh: ${job.salary}`}
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
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {`Job Title: ${application.job_title}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
