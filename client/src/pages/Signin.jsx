import authentication from "../assets/authentication.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  const currentUser = useSelector((state) => state.user.currentUser);
  async function handleSignInSubmit(e) {
    e.preventDefault();
    const response = await axios.post("/api/v1/users/signin", {
      password: signInForm.password,
      [signInForm.userName.includes("@") ? "email" : "userName"]:
        signInForm.userName,
    });
    dispatch(signIn(response.data.user));
  }
  console.log(currentUser);
  return (
    <div className="flex justify-center items-center ">
      <div className="">
        <img src={authentication} alt="authentication" className="" />
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
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
        <Oauth />
      </div>
    </div>
  );
}
