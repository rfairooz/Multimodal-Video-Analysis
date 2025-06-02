"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import YouTubeIFrameCtrl from "youtube-iframe-ctrl";
import {
  validateYoutubeUrl,
  getYoutubeEmbedUrl,
  getYouTubeVideoTitle,
} from "@/lib/youtube";
import Button from "./Button";
import { LuTvMinimalPlay } from "react-icons/lu";
import { Timestamp } from "@/utils/types";

type Props = {
  onValidUrl?: (url: string) => void;
  timestamps: Timestamp[];
};

const Input = ({ onValidUrl, timestamps }: Props) => {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<YouTubeIFrameCtrl | null>(null);

  useEffect(() => {
    if (iframeRef.current) {
      playerRef.current = new YouTubeIFrameCtrl(iframeRef.current);
    }
  }, [videoUrl]);

  const handleTimestampClick = async (timeStr: string) => {
    const parts = timeStr.split(":").map(Number);
    let seconds = 0;

    if (parts.length === 3) {
      // hh:mm:ss
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      // mm:ss
      seconds = parts[0] * 60 + parts[1];
    } else {
      console.error("Invalid timestamp format:", timeStr);
      return;
    }

    await playerRef.current?.command("seekTo", [seconds, true]);
    await playerRef.current?.play();
  };

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
    <div className="w-full">
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
          <div className=" w-full flex-1 flex-col mt-10 ">
            <p className="text-slate-400 text-xl">{videoTitle}</p>
            <iframe
              ref={iframeRef}
              id="youtube-iframe"
              className="w-full h-5/6 rounded-xl my-4"
              src={`${getYoutubeEmbedUrl(videoUrl)}?enablejsapi=1` || ""}
              allow="autoplay; encrypted-media"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <LuTvMinimalPlay className="text-slate-400/60" size={50} />{" "}
          </div>
        )}
      </div>
      {videoUrl && timestamps.length > 0 && (
        <div className="mt-4 text-slate-300 space-y-2 overflow-y-auto">
          <p className="font-semibold text-slate-300  text-xl">Timestamps:</p>
          {timestamps.map((stamp, idx) => (
            <button
              key={idx}
              onClick={() => handleTimestampClick(stamp.time)}
              className="hover:underline hover:text-indigo-300 hover:font-semibold block text-left hover:cursor-pointer"
            >
              {stamp.time} – {stamp.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
