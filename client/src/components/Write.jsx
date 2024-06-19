import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import categories from "../utils/categories.js";
import axios from "axios";
import uploadOnFirebase from "../utils/uploadOnFirebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../utils/firebase.js";

export default function MyComponent({ currentUser }) {
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    image: null,
    category: "",
  });

  function handleChange(e) {
    const { id, value, files } = e.target;
    setPostForm((prevForm) => ({
      ...prevForm,
      [id]: files ? files[0] : value,
    }));
  }
  async function postSubmit(e) {
    e.preventDefault();
    try {
      const url = await uploadOnFirebase(postForm.image);
      await axios.post("/api/v1/post", {
        title: postForm.title,
        content: postForm.content,
        image: url,
        category: postForm.category,
        author: currentUser.id,
        slug: postForm.title.split(" ").join("-"),
      });
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  }

  return (
    <div className="w-4/5 bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={postSubmit} encType="multipart/form-data">
          <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={postForm.title}
            onChange={handleChange}
            placeholder="Enter your title"
            className="w-full p-2 mb-4 border rounded"
          />
          <label htmlFor="category" className="block text-gray-700 mb-2">
            Select Category
          </label>
          <select
            id="category"
            value={postForm.category}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="" disabled>
              Select an option
            </option>
            {categories.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <label htmlFor="content" className="block text-gray-700 mb-2">
            Content
          </label>
          <div className="mb-4 h-60">
            <ReactQuill
              value={postForm.content}
              onChange={(e) =>
                setPostForm((prevForm) => ({ ...prevForm, content: e }))
              }
              theme="snow"
              id="content"
              className="h-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
