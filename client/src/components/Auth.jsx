import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Oauth from "./Oauth";
import { useSelector, useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";
import { signIn, signOut } from "../redux/user/userSlice";
export default function Auth({ isOpen, popUpClose }) {
  const [isSignIn, setSignIn] = useState(true);
  const [signInForm, setSignInForm] = useState({
    userName: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  function signInFormDataChange(e) {
    setSignInForm({
      ...signInForm,
      [e.target.id]: e.target.value,
    });
  }
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
  async function handleSignInSubmit(e) {
    e.preventDefault();
    const response = await axios.post("/api/v1/users/signin", {
      password: signInForm.password,
      [signInForm.userName.includes("@") ? "email" : "userName"]:
        signInForm.userName,
    });
    dispatch(signIn(response.data.user));
  }
  if (!isOpen) {
    return null;
  }

  return (
    <div className="h-screen w-screen bg-red-800 fixed flex justify-center items-center">
      <div className="bg-green-800 h-5/6 w-9/20 rounded-xl ">
        <h1>Sign In to your account</h1>
        <div className="">
          <MdCancel className="" onClick={popUpClose} />
          {isSignIn ? (
            <div className="">
              <form className="" onSubmit={handleSignInSubmit}>
                <label htmlFor="userName">UserID</label>
                <input
                  type="text"
                  id="userName"
                  value={signInForm.userName}
                  placeholder="Enter your Email or Username"
                  onChange={signInFormDataChange}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={signInForm.password}
                  placeholder="Enter your password"
                  onChange={signInFormDataChange}
                  required
                />
                <button type="submit">Submit</button>
              </form>
              <div className="">
                Don't have an account?
                <button onClick={() => setSignIn(false)}>Sign Up</button>
              </div>
            </div>
          ) : (
            <div className="">
              <form onSubmit={handleSignUpSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={signUpForm.name}
                  placeholder="Enter your name"
                  onChange={signUpFormDataChange}
                />
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  id="userName"
                  placeholder="Enter you Username"
                  value={signUpForm.userName}
                  onChange={signUpFormDataChange}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={signUpForm.email}
                  onChange={signUpFormDataChange}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={signUpForm.password}
                  placeholder="Enter your password"
                  onChange={signUpFormDataChange}
                  required
                />
                <button type="submit">Submit</button>
              </form>
              Already have an account
              <button onClick={() => setSignIn(true)}>Sign In</button>
            </div>
          )}
        </div>
        <Oauth />
      </div>
    </div>
  );
}
