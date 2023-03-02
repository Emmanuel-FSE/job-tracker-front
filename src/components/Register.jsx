import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleRegister(event) {
    event.preventDefault();
    fetch("http://localhost:9292/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Your account was successfully created. Yaay!!",
          icon: "info",
          timer: 2000,
        });
        setTimeout(() => navigate("/"), 3000);
      })
      .catch((error) => {
        Swal.fire({
          title: "There was an error processing yor application!",
          icon: "error",
          timer: 2000,
        });
      });
    setRegister({
      name: "",
      email: "",
      password: "",
    });
  }
  return (
    <section className="bg-gray-400">
      <div className="bg-teal-500 text-center font-bold p-4 text-3xl text-gray-900 font-serif">
        "Job Tracker"
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign up for an account
            </h1>
            <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={register.name}
                  onChange={(event) =>
                    setRegister((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Emmanuel Mutisya"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={register.email}
                  onChange={(event) =>
                    setRegister((prevState) => ({
                      ...prevState,
                      email: event.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={register.password}
                  onChange={(event) =>
                    setRegister((prevState) => ({
                      ...prevState,
                      password: event.target.value,
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
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 ">
                If you have account{" "}
                <a
                  href="/login"
                  className="font-bold text-primary-600 hover:underline"
                >
                  Sign in!
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
