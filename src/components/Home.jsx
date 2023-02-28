import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const jobsDiv = jobs.map((job) => {
    return (
      <a
        href={`/jobs/${job.id}`}
        key={job.id}
        className="rounded bg-white overflow-hidden shadow-lg"
      >
        <img
          className="w-full"
          src={`https://source.unsplash.com/random/800x600?job&${job.id}`}
          alt="Mountain"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {`Job Title: ${job.title}`}{" "}
          </div>
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
      </a>
    );
  });

  return (
    <div className="bg-gray-400">
      <Header />
      <div className="p-10 text-xl font-bold font-serif rounded shadow-lg">
        <p>
          Welcome to our website, the one-stop destination for job seekers to
          explore various employment opportunities and apply for their dream
          jobs. We understand that searching for a job can be an overwhelming
          experience, and our platform is designed to simplify the process and
          make it hassle-free for you.
        </p>
        <p>
          With our user-friendly interface, you can easily navigate through our
          job listings and find the perfect match for your skills and expertise.
          We have a wide range of job openings across different industries,
          including healthcare, finance, technology, education, and many more.
        </p>
      </div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {jobsDiv}
      </div>
    </div>
  );
}
