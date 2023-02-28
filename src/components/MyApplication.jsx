import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function Home() {
  const [applications, setApplications] = useState([]);

  let userId = localStorage.getItem("id");
  let refresh = 1;

  useEffect(() => {
    fetch(`http://localhost:9292/users/applications/${userId}`)
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, [userId, refresh]);

  function handleDelete(event){
    event.preventDefault();
    fetch(`http://localhost:9292/applications/${event.target.id}`, { method: 'DELETE', })
    .then(refresh += 1);
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
          <p className="text-gray-700 text-base">{application.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`Job Title: ${application.job_title}`}
          </span>
          <span onClick={handleDelete} id={application.id} className="ml-20">X</span>
        </div>
        {/* <button class="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded">
          Button
        </button> */}
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
    </div>
  );
}
