"use client";
import React from "react";
import { useState } from "react";
import {
  validateYoutubeUrl,
  getYoutubeEmbedUrl,
  getYouTubeVideoTitle,
} from "@/lib/youtube";
import Button from "./Button";
import { LuTvMinimalPlay } from "react-icons/lu";
type Props = {
  onValidUrl?: (url: string) => void;
};

const Input = ({ onValidUrl }: Props) => {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const inputValue = input?.trim() || "";

    setLoading(true);
    setError("");
    setVideoUrl("");
    setVideoTitle("");
    try {
      const validationResult = await validateYoutubeUrl(inputValue);
      if (!validationResult.isValid) {
        setError(validationResult.error || "Invalid URL");
        return;
      }
      const title = await getYouTubeVideoTitle(inputValue);
      setVideoUrl(inputValue);
      setVideoTitle(title);
      onValidUrl?.(inputValue);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col border-[0.5px] border-slate-400 rounded-xl p-8 w-full h-[60vh] ">
      <div className="flex justify-between">
        <input
          className="border-[0.5px] border-slate-200 text-slate-400 w-8/12 rounded p-2 bg-gray-900 flex justify-start"
          type="text"
          placeholder="paste youtube link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button loading={loading} text="Upload" onClick={handleUpload} />
      </div>
      {error && <p className="text-red-400 text-xl mt-4">{error}</p>}
      {videoUrl ? (
        <div className="h-full w-full flex flex-col mt-10 ">
          <p className="text-slate-400 text-xl">{videoTitle}</p>
          <iframe
            className="w-9/12 h-full rounded-xl my-4"
            src={getYoutubeEmbedUrl(videoUrl) || ""}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <LuTvMinimalPlay className="text-slate-400/60" size={50} />{" "}
        </div>
      )}
    </div>
  );
};

export default Input;
