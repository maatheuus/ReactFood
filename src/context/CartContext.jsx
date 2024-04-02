import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItems: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updateItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updateItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItems = state.items[existingCartItemIndex];
    const updateItems = [...state.items];

    if (existingCartItems.quantity === 1) {
      updateItems.splice(existingCartItemIndex, 1);
    } else {
      const updateItem = {
        ...existingCartItems,
        quantity: existingCartItems.quantity - 1,
      };
      updateItems[existingCartItemIndex] = updateItem;
    }
    return { ...state, items: updateItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartProvider({ children }) {
  const [cart, dispatchCatAction] = useReducer(cartReducer, { items: [] });

  function addItems(item) {
    dispatchCatAction({
      type: "ADD_ITEM",
      item,
    });
  }
  function removeItem(id) {
    dispatchCatAction({
      type: "REMOVE_ITEM",
      id,
    });
  }
  function clearCart() {
    dispatchCatAction({
      type: "CLEAR_CART",
    });
  }

  const ctxValue = {
    items: cart.items,
    addItems,
    removeItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
