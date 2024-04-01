import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ cart, actions }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {cart}
      <div className="modal-actions">
        <form method="dialog">{actions}</form>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
