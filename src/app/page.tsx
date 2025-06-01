"use client";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Chat from "@/components/Chat";
import { useState } from "react";
export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  return (
    <div className="flex items-center flex-col bg-gradient-to-b from-gray-900 to-gray-900/80 min-h-screen ">
      <Title />
      <div className="grid grid-cols-2 w-10/12 h-full">
        <div className="flex ">
          <Input onValidUrl={(url) => setVideoUrl(url)} />
        </div>
        <div className="flex">
          <Chat videoUrl={videoUrl} />
        </div>
      </div>
      <p className="text-white text-xl flex mt-4 w-10/12 ">Timestamps </p>
    </div>
  );
}
