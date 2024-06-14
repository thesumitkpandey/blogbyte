import React from "react";
import { FaNewspaper } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { MdLocalLibrary } from "react-icons/md";
export default function Sidebar({ currentUser }) {
  return (
    <div className="h-screen w-full m-8 md:m-0 text-white bg-gray-800 p-4 md:flex flex-col md:w-1/5  top-0 items-center">
      <img
        src={currentUser.avatar}
        alt="user image"
        className="rounded-full h-40 w-40 border-4 border-white"
      />
      <h1 className="text-2xl font-merriweather font-bold">
        {currentUser.name}
      </h1>
      <p className="font-bold text-sm text-blue-500">/{currentUser.userName}</p>
      <p className="text-center">
        THis is a demo bio and will be replaced later by the actual dynamic bio
      </p>
      <div className="h-0.5 w-full bg-white my-4"></div>
      <div className="w-full relative flex flex-col items-center">
        <h2 className="text-xl font-merriweather  tracking-widest">
          Reader's Stats
        </h2>
        <div className="flex items-center  justify-start w-full">
          <FaNewspaper className="mr-2" />
          <p>Readings 50</p>
        </div>
        <div className="flex items-center  justify-start w-full">
          <AiFillLike className="mr-2" />
          <p>Likes 50</p>
        </div>
        <div className="flex items-center  justify-start w-full">
          <FaCommentAlt className="mr-2" />
          <p>Comments 50</p>
        </div>
        <div className="flex items-center  justify-start w-full">
          <MdLocalLibrary className="mr-2" />
          <p>Library 50</p>
        </div>
      </div>
      <div className="h-0.5 w-full bg-white my-4"></div>
      <div className="w-full relative flex flex-col items-center">
        <h2 className="text-xl font-merriweather  tracking-widest">
          Writer's Stats
        </h2>
        <div className="flex items-center   justify-start w-full">
          <FaNewspaper className="mr-2" />
          <p>Views 50</p>
        </div>
        <div className="flex items-center  mb-1 justify-start w-full">
          <FaNewspaper className="mr-2" />
          <p>Comments 50</p>
        </div>
      </div>
    </div>
  );
}
