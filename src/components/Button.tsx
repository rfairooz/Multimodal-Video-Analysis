import React from "react";

type Props = {
  loading: boolean;
  onClick: () => void;
  text?: string;
};
const Button = ({ loading, onClick, text }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-800 border-white border-[0.5px] text-lg text-white rounded-lg p-2 w-2/12 flex justify-center hover:cursor-pointer hover:bg-indigo-500"
    >
      {loading ? ". . ." : text}
    </button>
  );
};

export default Button;
