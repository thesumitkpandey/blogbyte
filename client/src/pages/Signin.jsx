import authentication from "../assets/authentication.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Oauth from "../components/Oauth";
import { signIn, signOut } from "../redux/user/userSlice";

export default function Signin() {
  const [signInForm, setSignInForm] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();

  function signInFormDataChange(e) {
    setSignInForm({
      ...signInForm,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSignInSubmit(e) {
    e.preventDefault();
    const response = await axios.post("/api/v1/users/signin", {
      password: signInForm.password,
      [signInForm.userName.includes("@") ? "email" : "userName"]:
        signInForm.userName,
    });
    dispatch(signIn(response.data.user));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent px-4 py-10 md:py-20">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl ">
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src={authentication}
            alt="authentication"
            className="h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2 p-6 md:p-10">
          <form className="w-full" onSubmit={handleSignInSubmit}>
            <label htmlFor="userName" className="block text-gray-700">
              UserID
            </label>
            <input
              type="text"
              id="userName"
              value={signInForm.userName}
              placeholder="Enter your Email or Username"
              onChange={signInFormDataChange}
              required
              className="w-full mt-2 mb-4 p-2 border rounded"
            />
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={signInForm.password}
              placeholder="Enter your password"
              onChange={signInFormDataChange}
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
              Don't have an account?
              <Link to="/signup">
                <button className="ml-2 text-blue-500 hover:underline">
                  Sign Up
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
