import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addToCart: () => {},
  removeToCart: () => {},
});

function cartDispatch(state, action) {
  if (action.type === "ADD_ITEM") {
    const findExistenceIndex = state.items.findIndex(
      (meal) => meal.id === action.item.id
    );

    const updateItems = [...state.items];

    if (findExistenceIndex > -1) {
      const existenceItem = state.items[findExistenceIndex];
      const updateItem = {
        ...existenceItem,
        quantity: existenceItem.quantity + 1,
      };

      updateItems[findExistenceIndex] = updateItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updateItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const findExistenceIndex = state.items.findIndex(
      (meal) => meal.id === action.item.id
    );
    const updateItems = [...state.items];

    if (findExistenceIndex > -1) {
      const existenceItem = state.items[findExistenceIndex];
      const updateItem = {
        ...existenceItem,
        quantity: existenceItem.quantity - 1,
      };
      updateItems[findExistenceIndex] = updateItem;
    }

    if (action.item.quantity === 1) {
      updateItems.splice(findExistenceIndex, 1);
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

  function handleRemoveToCart(item) {
    dispatch({ type: "REMOVE_ITEM", item });
  }

  const totalItems = state.items.reduce(
    (amount, currentPrice) =>
      (amount + +currentPrice.price) * +currentPrice.quantity,
    0
  );
  const totalItemsFixed = totalItems.toFixed(2);

  const ctxValue = {
    items: state.items,
    totalItemsFixed,
    addToCart: handleAddToCart,
    removeToCart: handleRemoveToCart,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
export default CartProvider;
