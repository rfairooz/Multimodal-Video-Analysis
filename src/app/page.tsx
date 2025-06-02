"use client";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Chat from "@/components/Chat";
import { useState } from "react";
import { Timestamp } from "@/utils/types";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  return (
    <div className="flex items-center flex-col bg-gradient-to-b from-gray-900 to-gray-900/80 min-h-screen ">
      <Title />
      <div className="grid grid-cols-2 w-10/12 h-full">
        <div className="flex ">
          <Input
            onValidUrl={(url) => setVideoUrl(url)}
            timestamps={timestamps}
          />
        </div>
        <div className="flex">
          <Chat videoUrl={videoUrl} setTimestamps={setTimestamps} />
        </div>
      </div>
    </div>
  );
}
