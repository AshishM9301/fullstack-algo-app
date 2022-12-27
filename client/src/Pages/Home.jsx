import React from "react";
import { useDispatch, useSelector } from "react-redux";
//  import { useNavigate } from "react-router-dom";
import Button from "../Components/Button/Button";
// import ModalPoP from "../Components/Modal/ModalPoP";
// import { connect } from "../services/connector";
import { login } from "../_actions/_authActions";
const Home = () => {
  //  const [showModalPopup, setShowModalPopup] = useState(false);

  const dispatch = useDispatch();

  const link = useSelector((state) => state.auth.link);

  const handleLogin = async () => {
    dispatch(login());
    // setShowModalPopup(true);
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
