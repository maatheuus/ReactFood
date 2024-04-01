import { useContext, useRef } from "react";
import { ModalContext } from "../context/modal-context";
import { CartContext } from "../context/cart-context";
import { fetchSubmittedOrder } from "../http";

import Modal from "./Modal";
import Button from "./Button";
import { useFetch } from "../hooks/useFetch";

function Checkout() {
  const { messageSuccess, setOrder } = useFetch(fetchSubmittedOrder);

  const { checkoutIsOpen, successCartIsOpen, successMessage, close } =
    useContext(ModalContext);
  const { items, totalItemsFixed } = useContext(CartContext);

  const dialog = useRef();
  const fullNameOrder = useRef();
  const emailOrder = useRef();
  const streetOrder = useRef();
  const postalCodeOrder = useRef();
  const cityOrder = useRef();

  function submitOrder() {
    const datasUser = {
      items,
      customer: {
        name: fullNameOrder.current.value,
        email: emailOrder.current.value,
        street: streetOrder.current.value,
        "postal-code": postalCodeOrder.current.value,
        city: cityOrder.current.value,
      },
    };

    successMessage();
    setOrder(datasUser);
  }

  if (checkoutIsOpen) dialog?.current?.open();
  if (successCartIsOpen) dialog?.current?.open();

  return (
    <>
      <Modal
        ref={dialog}
        cart={
          successCartIsOpen ? (
            <form className="control" method="dialog">
              {messageSuccess ? (
                <>
                  <h2>Success</h2>
                  <p>Your order was submitted successfully.</p>
                  <p>
                    We will get back to you with more detail via email within
                    the new few minutes.
                  </p>
                </>
              ) : (
                <>
                  <h2>Error</h2>
                  <p>Your order was not submitted successfully.</p>
                  <p>Try again in a fill minutes, please!.</p>
                </>
              )}
            </form>
          ) : (
            <form className="control" method="dialog">
              <h2>Checkout</h2>
              <p>
                Total amount <span>${totalItemsFixed}</span>
              </p>
              <label htmlFor="full-name">Full Name</label>
              <input type="text" id="full-name" ref={fullNameOrder} />

              <label htmlFor="email">E-Mail Address</label>
              <input type="email" id="email" ref={emailOrder} />

              <label htmlFor="street">Street</label>
              <input type="text" id="street" ref={streetOrder} />

              <div className="control-row">
                <label htmlFor="postal-code">
                  Postal Code
                  <input type="number" id="postal-code" ref={postalCodeOrder} />
                </label>

                <label htmlFor="city">
                  City
                  <input type="text" id="city" ref={cityOrder} />
                </label>
              </div>
            </form>
          )
        }
        actions={
          successCartIsOpen ? (
            <Button onClick={close} className="button">
              Okay
            </Button>
          ) : (
            <>
              <Button onClick={close} className="text-button">
                Close
              </Button>

              <Button onClick={submitOrder} className="button">
                Submit Order
              </Button>
            </>
          )
        }
      />
    </>
  );
}

export default Checkout;
