import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({userId}) {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  function handleLogin(event) {
    event.preventDefault();
    fetch(`http://localhost:9292/users/${login.email}`)
      .then((res) => res.json())
      .then((data) => validateUser(data));
    setLogin({
      email: "",
      password: "",
    });
  }

  function validateUser(user) {
    if (user.password === login.password) {
      userId(user.id);
      setTimeout(() => navigate("/"), 2000);
    } else {
      alert("Error during validation");
    }
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
              Sign in to your account
            </h1>
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
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
                  value={login.email}
                  onChange={(event) =>
                    setLogin((prevState) => ({
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
                  value={login.password}
                  onChange={(event) =>
                    setLogin((prevState) => ({
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
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-bold text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
