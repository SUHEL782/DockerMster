import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, role } = event.target;

    
    axios.post("https://back-end-intragation.onrender.com/user/signup", {
        username: username.value,
        email: email.value,
        password: password.value,
        role: role.value,
      })
      .then((res) => {
        const data = res.data;
        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Signup failed");
      });
  };

  return (
    <main className="w-full h-screen flex justify-center items-center bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex flex-col space-y-3">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            className="p-2 rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            required
          />

          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            className="p-2 rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            className="p-2 rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />

          <label htmlFor="role" className="text-sm">
            Role
          </label>
          <input
            className="p-2 rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            name="role"
            id="role"
            placeholder="Enter your role"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br 
          focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}

export default Signup;
