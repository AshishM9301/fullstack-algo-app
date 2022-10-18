import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Calculation from "./Container/Calculation/Calculation";
import Main from "./Container/Main/Main";
import Trigger from "./Container/Trigger/Trigger";

const App = () => {
  return (
    <div className="bg-slate-300 min-h-screen flex flex-col justify-center items-center w-screen flex-1 shadow-lg border-2 rounded-b-2xl ">
      <div className="w-1/6 mx-auto">
        <div className="shadow-lg rounded-b-2xl">
          <Main />
          <Calculation />
        </div>
        <div className="bg-white mt-4 rounded-2xl">
          <Trigger />
        </div>
      </div>
    </div>
  );
};

export default App;
