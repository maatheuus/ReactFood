import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addToCart: () => {},
});

function cartDispatch(state, action) {
  if (action.type === "ADD_ITEM") {
    const findExistenceIndex = state.items.findIndex(
      (meal) => meal.id === action.item.id
    );

    const updateItems = [...state.items];

    if (findExistenceIndex > -1) return;
    else {
      updateItems.push({ ...action.item });
    }

    return { ...state, items: updateItems };
  }

  return state;
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartDispatch, {
    items: [],
  });

  function handleAddToCart(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  const ctxValue = {
    items: state.items,
    addToCart: handleAddToCart,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
export default CartProvider;
