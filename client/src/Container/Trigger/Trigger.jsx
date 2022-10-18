import React from "react";
import Button from "../../Components/Button/Button";

const Trigger = () => {
  return (
    <div className="bg-white w-full rounded-2xl">
      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="text-2xl">Trigger</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <input
            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 border text-xl w-full rounded text-center py-2 px-3"
            type="number"
          />
        </div>
      </div>

      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="uppercase text-xs ">Expiry</div>
          <input
            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 border text-xl w-full rounded text-center py-2 px-3"
            type="date"
          />
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="uppercase text-xs ">Qty</div>
          <input
            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 border text-xl w-full rounded text-center py-2 px-3"
            type="number"
          />
        </div>
      </div>

      <div className="flex justify-end py-3 pt-4 px-6 bg-gray-200 rounded-b-2xl">
        <Button title="Run Algo" />
      </div>
    </div>
  );
};

export default Trigger;
