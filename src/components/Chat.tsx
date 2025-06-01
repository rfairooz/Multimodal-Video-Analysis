import React from "react";
import Button from "./Button";
import { useState } from "react";
import { api } from "@/utils/api";
import { IoChatbubbleEllipses } from "react-icons/io5";

type Props = {
  videoUrl: string;
};
type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

const Chat = ({ videoUrl }: Props) => {
  const [history, setHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const startChat = async () => {
    setLoading(true);
    try {
      const res = await api({
        url: "/api/chat",
        method: "POST",
        body: {
          prompt,
          videoUrl,
          history,
        },
      });
      if (res && res.text) {
        setHistory([...history, { role: "user", parts: [{ text: prompt }] }]);
        setPrompt("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-slate-900 rounded-xl p-8 w-full h-[60vh] text-white">
      <IoChatbubbleEllipses className="text-4xl text-slate-400 w-full animate-bounce" />
      <div className="flex flex-col w-full h-11/12 justify-between items-end ">
        <div className="mt-4 h-full w-full">
          {history.map((chat, key) => (
            <p key={key}>{chat.parts[0].text}</p>
          ))}
        </div>
        <div className="flex w-full justify-between">
          <input
            className="border-[0.5px] border-slate-200 text-slate-200 w-8/12 rounded-full p-2 bg-gray-900 flex justify-start"
            type="text"
            placeholder="Ask about video ..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button loading={loading} text="Start Chat" onClick={startChat} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
