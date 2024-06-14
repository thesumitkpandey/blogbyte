import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function MyComponent() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  function postSubmit(e) {
    e.preventDefault();
    let url = URL.createObjectURL(image);
    console.log(url);
  }

  return (
    <div className="w-4/5 bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={postSubmit}>
          <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Title
          </label>
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your title"
            className="w-full p-2 mb-4 border rounded"
          />

          <label htmlFor="content" className="block text-gray-700 mb-2">
            Content
          </label>
          <div className="mb-4 h-60">
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              className="h-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
