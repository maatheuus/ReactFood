import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ title, cart, actions }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      checkout() {
        dialog.current.showModal();
      },
      success() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      <h2>{title}</h2>
      {cart}
      <div className="modal-actions">{actions}</div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
