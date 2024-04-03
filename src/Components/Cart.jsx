import { useContext } from "react";
import { currencyFormatter } from "../formatting";

import UserProgressContext from "../context/UserProgressContext";
import CartContext from "../context/CartContext";
import CartItem from "./CartItems";
import Modal from "./Modal";
import Button from "./Button";

function Cart() {
  const { items, addItems, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => (totalPrice + +item.price) * item.quantity,
    0
  );

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? hideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrese={() => addItems(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      {items.length === 0 && <p>Add some food to the cart 😃</p>}
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={hideCart}>
          Close{" "}
        </Button>

        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to Checkout </Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
