import { useContext } from "react";
import { ModalContext } from "../context/modal-context";

function Modal({ title, cart, actions }) {
  const { isOpen } = useContext(ModalContext);
  return (
    <dialog className="modal" open={isOpen}>
      <h2>{title}</h2>
      {cart}
      <div className="modal-actions">{actions}</div>
    </dialog>
  );
}

export default Modal;
