import { createContext, useReducer } from "react";

export const ModalContext = createContext({
  isOpen: false,
  open: () => {},
});

function modalDispatch(state, action) {
  if (action.type === "OPEN_MODAL") {
    return { ...state, isOpen: !state.isOpen };
  }

  return state;
}

function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalDispatch, {
    isOpen: false,
  });

  function openModal() {
    dispatch({ type: "OPEN_MODAL", open: true });
  }

  const ctxValue = {
    isOpen: state.isOpen,
    open: openModal,
  };
  return (
    <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
  );
}
export default ModalProvider;
