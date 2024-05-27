import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Oauth from "../components/Oauth";
import authentication from "../assets/authentication.jpg";
export default function Signup() {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  function signUpFormDataChange(e) {
    setSignUpForm({
      ...signUpForm,
      [e.target.id]: e.target.value,
    });
  }
  async function handleSignUpSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/users/signup", {
        name: signUpForm.name,
        userName: signUpForm.userName,
        email: signUpForm.email,
        password: signUpForm.password,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent px-4 py-10 md:py-20">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src={authentication}
            alt="authentication"
            className="h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2 p-6 md:p-10">
          <form
            className="w-full"
            onSubmit={handleSignUpSubmit}
            encType="multipart/form-data"
          >
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={signUpForm.name}
              placeholder="Enter your name"
              onChange={signUpFormDataChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded"
            />
            <label htmlFor="userName" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={signUpForm.userName}
              placeholder="Enter your Username"
              onChange={signUpFormDataChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded"
            />
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={signUpForm.email}
              placeholder="Enter your email"
              onChange={signUpFormDataChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded"
            />
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={signUpForm.password}
              placeholder="Enter your password"
              onChange={signUpFormDataChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </form>
          <div className="w-full mt-4 text-center">
            <div className="mb-2">
              Already have an account?
              <Link to="/signin">
                <button className="ml-2 text-blue-500 hover:underline">
                  Sign In
                </button>
              </Link>
            </div>
            <Oauth />
          </div>
        </div>
      </div>
    </div>
  );
}
