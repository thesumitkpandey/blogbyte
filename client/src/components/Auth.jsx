import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { MdCancel } from "react-icons/md";
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
      const jsonData = JSON.stringify(signInForm);
      console.log(jsonData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/signin",
        jsonData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data.token);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  if (!isOpen) {
    return null;
  }
  return (
    <div className="">
      <div className="">
        <MdCancel className="" onClick={popUpClose} />
        {isSignIn ? (
          <div className="">
            <form className="" onSubmit={handleSignUpSubmit}>
              <label htmlFor="user">UserID</label>
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
              Don't have an account?{" "}
              <button onClick={() => setSignIn(false)}>Sign Up</button>
            </div>
          </div>
        ) : (
          <div className="">
            <form>
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
              <lable htmlFor="email">Email</lable>
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
          </div>
        )}
      </div>
    </div>
  );
}
