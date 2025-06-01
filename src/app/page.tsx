"use client";
import Input from "@/components/Input";
import Title from "@/components/Title";
import Chat from "@/components/Chat";
export default function Home() {
  return (
    <div className="flex items-center flex-col bg-gradient-to-b from-gray-900 to-gray-900/80 min-h-screen ">
      <Title />
      <div className=" flex-grow grid  mx-auto grid-cols-2 w-10/12 h-screen">
        <div className="flex flex-col h-full">
          <Input onValidUrl={(url) => console.log("Valid Video: ", url)} />
          <Chat />
        </div>
        <div className="text-white text-xl flex justify-center">Timestamps</div>
      </div>
    </div>
  );
}
