import { createContext, useReducer } from "react";

export const ModalContext = createContext({
  cartIsOpen: false,
  checkoutIsOpen: false,
  cartModal: () => {},
  checkoutModal: () => {},
  close: () => {},
});

function modalDispatch(state, action) {
  if (action.type === "OPEN_CART_MODAL") {
    return { ...state, cartIsOpen: true };
  }
  if (action.type === "OPEN_CHECKOUT_MODAL") {
    return { ...state, checkoutIsOpen: true, cartIsOpen: false };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, checkoutIsOpen: false, cartIsOpen: false };
  }

  return state;
}

function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalDispatch, {
    cartIsOpen: false,
    checkoutIsOpen: false,
  });

  function cartModal() {
    dispatch({ type: "OPEN_CART_MODAL", open: true });
  }
  function checkoutModal() {
    dispatch({ type: "OPEN_CHECKOUT_MODAL", open: true });
  }

  function closeModal() {
    dispatch({ type: "CLOSE_MODAL", close: false });
  }

  const ctxValue = {
    cartIsOpen: state.cartIsOpen,
    checkoutIsOpen: state.checkoutIsOpen,
    cartModal,
    checkoutModal,
    close: closeModal,
  };
  return (
    <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
  );
}
export default ModalProvider;
