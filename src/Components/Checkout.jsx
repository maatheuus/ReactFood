import { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../context/modal-context";
import Modal from "./Modal";
import Button from "./Button";
import { CartContext } from "../context/cart-context";
import { fetchSubmittedOrder } from "../http";

function Checkout() {
  const [order, setOrder] = useState();

  const [messageSuccess, setMessageSuccess] = useState(undefined);

  const { checkoutIsOpen, successCartIsOpen, successMessage, close } =
    useContext(ModalContext);
  const { items } = useContext(CartContext);

  const dialog = useRef();
  const fullNameOrder = useRef();
  const emailOrder = useRef();
  const streetOrder = useRef();
  const postalCodeOrder = useRef();
  const cityOrder = useRef();

  const totalItems = items.reduce(
    (amount, currentPrice) =>
      (amount + +currentPrice.price) * +currentPrice.quantity,
    0
  );
  const totalItemsFixed = totalItems.toFixed(2);

  const checkout = messageSuccess === undefined;
  const messageIsSuccess = messageSuccess !== undefined;

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

    setOrder(datasUser);
    successMessage();
  }

  useEffect(() => {
    async function orderFn() {
      if (successCartIsOpen) {
        const submittedOrder = await fetchSubmittedOrder(order);

        submittedOrder?.message
          ? setMessageSuccess(submittedOrder.message)
          : null;
      }
    }
    orderFn();
  }, [order, items, successCartIsOpen]);

  if (checkoutIsOpen && checkout) dialog?.current?.checkout();
  if (messageIsSuccess && successCartIsOpen) dialog?.current?.success();

  return (
    <>
      {checkoutIsOpen && checkout && (
        <Modal
          ref={dialog}
          title="Checkout"
          cart={
            <form className="control" method="dialog">
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
      )}

      {messageIsSuccess && successCartIsOpen && (
        <Modal
          ref={dialog}
          title="Success!"
          cart={
            <form className="control" method="dialog">
              <p>Your order was submitted successfully.</p>
              <p>
                We will get back to you with more detail via email within the
                new few minutes.
              </p>
            </form>
          }
          actions={
            <form method="dialog">
              <Button onClick={close} className="button">
                Okay
              </Button>
            </form>
          }
        />
      )}
      {!messageIsSuccess && successCartIsOpen && (
        <Modal
          ref={dialog}
          title="Error!"
          cart={
            <form className="control" method="dialog">
              <p>
                Missing data: Email, name, street, postal code or city is
                missing.
              </p>
            </form>
          }
          actions={
            <form method="dialog">
              <Button onClick={close} className="button">
                Okay
              </Button>
            </form>
          }
        />
      )}
    </>
  );
}

export default Checkout;
