import React from "react";
import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function ModalForm({ children }) {
  const state = useContext(GlobalState);

  const [showModal, setShowModal] = state.modal;

  let subComponentList = Object.keys(ModalForm);

  let subComponents = subComponentList.map((key) => {
    return React.Children.map(children, (child) =>
      child.type.name === key ? child : null
    );
  });
  return (
    <div
      className={showModal ? "modal-page active" : "modal-page"}
      onClick={() => {
        setShowModal(false);
      }}
    >
      <div className="modal-container">{subComponents.map((component) => component)}</div>
    </div>
  );
}

const Header = (props) => <div className="modalForm-header">{props.children}</div>;
ModalForm.Header = Header;

const Body = (props) => <div className="modalForm-body">{props.children}</div>;
ModalForm.Body = Body;

const Footer = (props) => <div className="modalForm-footer">{props.children}</div>;
ModalForm.Footer = Footer;

export default ModalForm;
