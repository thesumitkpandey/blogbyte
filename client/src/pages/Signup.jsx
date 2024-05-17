import { useState } from "react";
export default function Signup() {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    avatar: null,
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
        avatar: signUpForm.avatar,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="">
      <form onSubmit={handleSignUpSubmit} enctype="multipart/form-data">
        <label htmlFor="avatar">Photo</label>
        <input
          type="file"
          id="avatar"
          value={signUpForm.avatar}
          onChange={signUpFormDataChange}
          accept="image/png, image/jpeg"
        />
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
    </div>
  );
}
