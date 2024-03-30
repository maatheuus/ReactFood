import { useContext, useRef } from "react";
import { ModalContext } from "../context/modal-context";
import Modal from "./Modal";
import Button from "./Button";
import { CartContext } from "../context/cart-context";

function Checkout() {
  const dialog = useRef();
  const { checkoutIsOpen, close } = useContext(ModalContext);
  const { items } = useContext(CartContext);

  const totalItems = items.reduce(
    (amount, currentPrice) =>
      (amount + +currentPrice.price) * +currentPrice.quantity,
    0
  );

  const totalItemsFixed = totalItems.toFixed(2);

  if (checkoutIsOpen) dialog?.current?.checkout();

  function submitOrder() {
    console.log("submitted");
  }

  return (
    <Modal
      ref={dialog}
      title="Checkout"
      cart={
        <form className="control" method="dialog">
          <p>
            Total amount <span>${totalItemsFixed}</span>
          </p>
          <label htmlFor="full-name">Full Name</label>
          <input type="text" id="full-name" />

          <label htmlFor="email">E-Mail Address</label>
          <input type="email" id="email" />

          <label htmlFor="street">Street</label>
          <input type="text" id="street" />

          <div className="control-row">
            <label htmlFor="postal-code">
              Postal Code
              <input type="text" id="postal-code" />
            </label>

            <label htmlFor="city">
              City
              <input type="text" id="city" />
            </label>
          </div>
        </form>
      }
      actions={
        <form method="dialog">
          <Button onClick={close} className="text-button">
            Close
          </Button>

          <Button onClick={submitOrder} className="button">
            Submit Order
          </Button>
        </form>
      }
    />
  );
}

export default Checkout;
