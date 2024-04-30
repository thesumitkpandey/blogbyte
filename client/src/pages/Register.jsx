import React, { useState } from "react";
import classes from "../css/Register.module.css";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
  });

  function handleDataChange(e) {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={classes.signin}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Please enter your name"
          value={data.name}
          onChange={handleDataChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Please enter your email"
          value={data.email}
          onChange={handleDataChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Please enter your password"
          value={data.password}
          onChange={handleDataChange}
        />

        <button type="submit" id="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
}
