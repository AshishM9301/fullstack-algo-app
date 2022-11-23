import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button/Button";
import ModalPoP from "../Components/Modal/ModalPoP";
import { connect } from "../services/connector";
const Home = () => {
  const [showModalPopup, setShowModalPopup] = useState(false);
  const [link, setLink] = useState("");
  const handleLogin = async () => {
    const res = await connect("/auth/generate/auth", "GET", null, null);
    setLink(res?.link);
    setShowModalPopup(true);
  };

  return (
    <div>
      <Button title="Login" onClick={handleLogin} />
      {/* {showModalPopup && (
        <ModalPoP
          modalIsOpen={showModalPopup}
          closeModal={() => {
            setShowModalPopup(false);
          }}
          link={link}
        />
      )} */}
      {link && (
        <button>
          <a href={link}>Lets go</a>
        </button>
      )}
    </div>
  );
};

export default Home;
