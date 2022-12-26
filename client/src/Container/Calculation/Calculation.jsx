import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Components/Button/Button";
import {
  changeCEValue,
  changePEValue,
  getCE_PE_Data,
} from "../../_actions/_orderActions";

const Calculation = () => {
  const dispatch = useDispatch();

  const LTP = useSelector((state) => state.order.LTP);
  const CE = useSelector((state) => state.order.CE);
  const CE_Symbol = useSelector((state) => state.order.CE_Symbol);
  const PE = useSelector((state) => state.order.PE);
  const PE_Symbol = useSelector((state) => state.order.PE_Symbol);
  const xValue = useSelector((state) => state.order.CE_MarketData);
  const yValue = useSelector((state) => state.order.PE_MarketData);

  let z = xValue + yValue;

  return (
    <div className="bg-white w-full rounded-b-2xl">
      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="uppercase text-xs ">Upper Bracket</div>
          <div className="text-2xl">{CE} CE</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="uppercase text-xs ">{CE_Symbol}</div>
          <div className="text-2xl">= {xValue || 0} </div>
        </div>
      </div>

      <div className="flex py-4 px-6">
        <div className="flex-1 text-cyan-900 pr-6 text-left">
          <div className="uppercase text-xs ">Upper Bracket</div>
          <div className="text-2xl">{PE} PE</div>
        </div>

        <div className="flex-1 text-cyan-900 text-right">
          <div className="uppercase text-xs ">{PE_Symbol}</div>
          <div className="text-2xl">= {yValue || 0} </div>
        </div>
      </div>

      <div className="flex justify-center items-center my-4">
        <Button
          title="GET CE & PE Market Data"
          onClick={(e) => {
            dispatch(getCE_PE_Data());
          }}
        />
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
