import React from "react";

const Button = ({ title }) => {
  return (
    <div className="px-10 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm">
      {title}
    </div>
  );
};

export default Button;
