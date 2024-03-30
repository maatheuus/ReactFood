import { useContext, useRef } from "react";
import { ModalContext } from "../context/modal-context";
import { CartContext } from "../context/cart-context";

import Modal from "./Modal";
import CartItems from "./CartItems";
import Button from "./Button";
import Checkout from "./Checkout";

function Cart() {
  const dialog = useRef();
  const { cartIsOpen, close, checkoutModal } = useContext(ModalContext);
  const { items } = useContext(CartContext);

  if (cartIsOpen) dialog?.current?.open();

  return (
    <>
      <Modal
        ref={dialog}
        title="Your Cart"
        cart={<CartItems />}
        actions={
          <form method="dialog">
            <Button onClick={close} className="text-button">
              Close
            </Button>
            {items.length === 0 ? (
              <Button onClick={close} className="button">
                Go to Shop
              </Button>
            ) : (
              <Button onClick={checkoutModal} className="button">
                Go to Checkout
              </Button>
            )}
          </form>
        }
      />
      <Checkout />
    </>
  );
}

export default Cart;
