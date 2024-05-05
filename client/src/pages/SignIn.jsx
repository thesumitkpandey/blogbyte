import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../css/auth.module.css";
export default function SignIn() {
  const [loginForm, setLoginForm] = useState({
    user: "",
    password: "",
  });
  function formDataChange(e) {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });
  }
  function handleFormSubmit() {
    e.preventDefault();
    console.log;
  }
  return (
    <div className={classes.authDiv}>
      <form className={classes.authForm} onSubmit={handleFormSubmit}>
        <label htmlFor="user">UserID</label>
        <input
          type="text"
          id="user"
          value={loginForm.user}
          placeholder="Enter your Email or Username"
          onChange={formDataChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={loginForm.password}
          placeholder="Enter your password"
          onChange={formDataChange}
          required
        />
        <input type="submit" id="submit" />
      </form>
      <div className={classes.message}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
