import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Calculation from "../Container/Calculation/Calculation";
import Main from "../Container/Main/Main";
import Trigger from "../Container/Trigger/Trigger";
import { socket } from "../services/connector";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../_actions/_authActions";
import { loadInitialDataSocket } from "../_actions/_orderActions";

const Algo = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  // const token = useSelector((state) => state.auth.token);
  const order = useSelector((state) => state.order);

  // let navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [dispatch, getAccessToken]);

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
            <Calculation />
          </div>
          <div className="bg-white mt-4 rounded-2xl">
            <Trigger />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algo;
