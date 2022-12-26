import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Calculation from "../Container/Calculation/Calculation";
import Main from "../Container/Main/Main";
import Trigger from "../Container/Trigger/Trigger";
import { connect, socket } from "../services/connector";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../_actions/_authActions";
import {
  FUTMarketData,
  getFutMarketData,
  loadInitialDataSocket,
} from "../_actions/_orderActions";

const Algo = () => {
  const [LTP, setLTP] = useState("");
  const [CE, setCE] = useState("");
  const [PE, setPE] = useState("");
  const [CEValue, setCEValue] = useState("");
  const [PEValue, setPEValue] = useState("");
  const [date, setDate] = useState("");
  const [lowestPrice, setLowestPrice] = useState(0);
  const [XYValue, setXYValue] = useState({ x: 0, y: 0 });

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const order = useSelector((state) => state.order);

  let navigate = useNavigate();

  const getAccessToken = async () => {
    const s = searchParams.get("s");
    let authCode = "";
    if (s === "ok") {
      authCode = searchParams.get("auth_code");
    }

    dispatch(loadUser({ authCode }));

    // console.log(order);
  };

  useEffect(() => {
    getAccessToken();

    dispatch(loadInitialDataSocket(socket));
  }, []);

  const changeLTP = (ltp) => {
    setLTP(ltp);
  };

  const changeCE = (ce) => {
    setCEValue(ce);
  };

  const changePE = (pe) => {
    setPEValue(pe);
  };

  const changeDate = (d) => {
    console.log(d);
  };

  useEffect(() => {}, [date, CEValue, PEValue, LTP]);

  // useEffect(() => {
  //   setCE(`USDINR${date + CEValue}CE`);
  //   setPE(`USDINR${date + PEValue}PE`);

  //   let token = localStorage.getItem("token");

  //   let CEdata = {
  //     CEsymbol: `USDINR${date + CEValue}CE`,
  //     token: token,
  //   };

  //   let PEdata = {
  //     PEsymbol: `USDINR${date + PEValue}PE`,
  //     token: token,
  //   };

  //   socket.emit("ce-symbol", CEdata);

  //   socket.emit("pe-symbol", PEdata);
  // }, [date, CEValue, PEValue, LTP]);

  return (
    <div>
      <div className="bg-slate-300 min-h-screen flex flex-col justify-center items-center w-screen flex-1 shadow-lg border-2 rounded-b-2xl ">
        <div>Lowest price : {order?.FUT_MarketData}</div>
        <div className="w-1/6 mx-auto">
          <div className="shadow-lg rounded-b-2xl">
            <Main />
            <Calculation xValue={XYValue.x} yValue={XYValue.y} />
          </div>
          <div className="bg-white mt-4 rounded-2xl">
            <Trigger changeCE={changeCE} changePE={changePE} PE={PE} CE={CE} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algo;
