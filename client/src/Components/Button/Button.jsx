import React from "react";

const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="px-10 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
    >
      {title}
    </button>
  );
};

export default Button;
