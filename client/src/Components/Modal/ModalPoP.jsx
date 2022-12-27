import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
import Modal from "react-modal";

const ModalPoP = ({ modalIsOpen, closeModal, link }) => {
  // const [html, setHtml] = useState(null);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <iframe
          src={link}
          title="Link"
          style={{ width: "500px", height: "500px" }}
        />
      </Modal>
    </div>
  );
};

export default ModalPoP;
