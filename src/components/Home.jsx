import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  console.log(jobs);

  const jobsDiv = jobs.map((job) => {
    return (

      <div class="rounded bg-white overflow-hidden shadow-lg">
        <img class="w-full" src={`https://source.unsplash.com/random/800x600?job&${job.id}`} alt="Mountain" />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{job.title}</div>
          <p class="text-gray-700 text-base">
            {job.description}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`Company: ${job.company}`}
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`Location: ${job.location}`}
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`Salary => Ksh: ${job.salary}`}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-gray-400">
      <Header />
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {jobsDiv}
      </div>
    </div>
  );
}
