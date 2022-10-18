import React from "react";

const Main = () => {
  return (
    <div className="flex justify-between bg-cyan-700 rounded-t-2xl px-6 py-4 items-center">
      <div className=" pr-4">
        <div className="text-blue-200">5 OCT 2022</div>
        <div className="text-white text-xl">MON</div>
      </div>

      <div className="text-white flex flex-col justify-center items-center pr-4">
        <div className="text-2xl">82.2</div>
        <div className="text-sm text-zinc-300">LTP</div>
      </div>

      <div className="flex justify-center items-center rounded bg-cyan-600 w-12 h-12 text-white">
        b
      </div>
    </div>
  );
};

export default Main;
