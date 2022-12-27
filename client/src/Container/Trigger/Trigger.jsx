import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import Button from "../../Components/Button/Button";
import { connect } from "../../services/connector";
import { useDispatch, useSelector } from "react-redux";
import { changeDate } from "../../_actions/_orderActions";

const Trigger = () => {
  const dispatch = useDispatch();

  // const CE = useSelector((state) => state.order.CE);
  const CE_Symbol = useSelector((state) => state.order.CE_Symbol);
  // const PE = useSelector((state) => state.order.PE);
  const PE_Symbol = useSelector((state) => state.order.PE_Symbol);

  const [date, setDate] = useState(dayjs(Date.now()).format("YY-MMM-DD"));
  const [qty, setQTY] = useState(0);
  const [limitPrice, setLimitPrice] = useState(0);

  // const [lowest_price] = useState(localStorage.getItem("lowest_price"));
  const [errMessage, setErrMessage] = useState("");

  const handleAlgoInitiation = async () => {
    console.log("Hello");
    let body = {
      trigger: limitPrice,
      qty,
      CESymbol: CE_Symbol,
      PESymbol: PE_Symbol,
    };

    const res = await connect("/market", "POST", JSON.stringify(body), null);

    console.log(res);
  };

  return (
    <div className="bg-white w-full rounded-2xl">
      {errMessage && <div className="text-red-500 text-sm">{errMessage}</div>}
      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="text-2xl">Trigger</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <input
            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-400
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="number"
            value={limitPrice}
            onChange={(e) => {
              setLimitPrice(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="uppercase text-xs ">Expiry</div>
          <input
            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 border text-xl w-full rounded text-center py-2 px-3"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              dispatch(changeDate(dayjs(e.target.value).format("YY-MMM-DD")));
            }}
          />
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="uppercase text-xs ">Qty</div>
          <input
            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-400
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="number"
            value={qty}
            onChange={(e) => {
              if (e.target.value > 0) {
                setQTY(e.target.value);
                setErrMessage("");
              } else {
                setErrMessage(`Enter QTY more than 0`);
                setQTY(e.target.value);
              }
            }}
          />
        </div>
      </div>

      <div className="flex justify-end py-3 pt-4 px-6 bg-gray-200 rounded-b-2xl">
        <Button title="Run Algo" onClick={handleAlgoInitiation} />
      </div>
    </div>
  );
};

export default Trigger;
