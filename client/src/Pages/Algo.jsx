import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Calculation from "../Container/Calculation/Calculation";
import Main from "../Container/Main/Main";
import Trigger from "../Container/Trigger/Trigger";
import { connect } from "../services/connector";

import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5050");

const Algo = () => {
  const [LTP, setLTP] = useState("");
  const [CE, setCE] = useState("");
  const [PE, setPE] = useState("");
  const [CEValue, setCEValue] = useState("");
  const [PEValue, setPEValue] = useState("");
  const [date, setDate] = useState("");
  const [lowestPrice, setLowestPrice] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  socket.on("data-from-server", (data) => {
    console.log(JSON.parse(data), JSON.parse(data)?.d["7208"][0].v.low_price);
    setLowestPrice(JSON.parse(data)?.d["7208"][0]?.v?.low_price);
    localStorage.setItem(
      "lowest_price",
      JSON.parse(data)?.d["7208"][0]?.v?.low_price
    );
  });

  const getAccessToken = async () => {
    const s = searchParams.get("s");
    let authCode = "";
    if (s === "ok") {
      authCode = searchParams.get("auth_code");
    }

    const res = await connect(
      `/redirect?s=ok&auth_code=${authCode}`,
      "GET",
      null,
      null
    );

    if (res.success) {
      console.log(res, "Response");
      socket.emit("token", res.token);
      localStorage.setItem("token", JSON.stringify(res));
    }
  };

  useEffect(() => {
    getAccessToken();
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
    setDate(`${d[0] + d[1].split("")[0] + d[2]}`);
  };

  useEffect(() => {
    setCE(`USDINR${date + CEValue}CE`);
    setPE(`USDINR${date + PEValue}PE`);
  }, [date, CEValue, PEValue, LTP]);

  return (
    <div>
      <div className="bg-slate-300 min-h-screen flex flex-col justify-center items-center w-screen flex-1 shadow-lg border-2 rounded-b-2xl ">
        <div>Lowest price : {lowestPrice}</div>
        <div className="w-1/6 mx-auto">
          <div className="shadow-lg rounded-b-2xl">
            <Main ltp={changeLTP} />
            <Calculation
              value={LTP}
              changeCE={changeCE}
              changePE={changePE}
              PE={PE}
              CE={CE}
            />
          </div>
          <div className="bg-white mt-4 rounded-2xl">
            <Trigger
              changeCE={changeCE}
              changePE={changePE}
              PE={PE}
              CE={CE}
              changeDate={changeDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algo;
