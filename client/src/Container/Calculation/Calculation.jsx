import React from "react";

const Calculation = ({ value, CE, PE, changeCE, changePE }) => {
  let x = 0.0125;
  let y = 0.011;

  let a = CE || "USDINR22O0782.25CE",
    b = PE || "USDINR22O0782PE",
    p,
    q,
    z;

  function closest(arr, val) {
    return Math.max.apply(
      null,
      arr.filter(function (v) {
        return v <= val;
      })
    );
  }
  if (value) {
    let newValueArr = value.toString().split(".");

    let newValue = parseInt(newValueArr[1]);

    if (newValueArr[1] < 10) {
      newValue = newValueArr[1] * 10;
    }

    let arrRange = [0, 25, 50, 75, 100];

    let no = closest(arrRange, newValue);

    if (no < newValue) {
      x = no / 100 + 0.25;
      y = no / 100;
      p = x + parseInt(newValueArr[0]);
      q = y + parseInt(newValueArr[0]);

      changeCE(p);
      changePE(q);
      z = x + y;
    }
  }

  return (
    <div className="bg-white w-full rounded-b-2xl">
      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="uppercase text-xs ">Upper Bracket</div>
          <div className="text-2xl">{p} CE</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="uppercase text-xs ">{a}</div>
          <div className="text-2xl">= {x} </div>
        </div>
      </div>

      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="uppercase text-xs ">Upper Bracket</div>
          <div className="text-2xl">{q} PE</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="uppercase text-xs ">{b}</div>
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
