import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function Home() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);


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
          <p className="text-gray-700 text-base">{application.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-lime-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`Job Title: ${application.job_title}`}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-gray-400">
      <Header />
      <div className="p-10 text-xl bg-white font-bold font-serif rounded shadow-lg">
      <h2 className="text-3xl text-center p-2 underline">Available applications</h2>
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
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {applicationsDiv}
      </div>
    </div>
  );
}
