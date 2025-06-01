import React from "react";
import { FaBrain, FaPlay } from "react-icons/fa";
const Title = () => {
  return (
    <div className="w-full justify-center flex items-center m-10">
      <p className="text-8xl text-white">ClipMind</p>
      <FaPlay className="text-6xl text-pink-500 " />
      <FaBrain className="text-6xl text-indigo-600" />
    </div>
  );
};

export default Title;
