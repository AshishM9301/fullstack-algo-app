import React from "react";

const Calculation = () => {
  let x = 0.0125;
  let y = 0.011;

  let z = x + y;

  return (
    <div className="bg-white w-full rounded-b-2xl">
      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="uppercase text-xs ">Upper Bracket</div>
          <div className="text-2xl">82.25 CE</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="uppercase text-xs ">USDINR22O0782.25CE</div>
          <div className="text-2xl">= {x} </div>
        </div>
      </div>

      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="uppercase text-xs ">Upper Bracket</div>
          <div className="text-2xl">82 PE</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="uppercase text-xs ">USDINR22O0782PE</div>
          <div className="text-2xl">= {y} </div>
        </div>
      </div>

      <div className="flex py-4 px-6 pb-5 bg-gray-200 rounded-b-2xl">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="text-2xl">SUM</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="text-2xl">= {z} </div>
        </div>
      </div>
    </div>
  );
};

export default Calculation;
