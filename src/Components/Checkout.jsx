import { useContext } from "react";
import { currencyFormatter } from "../formatting";

import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";
import useHttp from "../http";
import Error from "./Error";

const resquestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { hideCheckout, progress } = useContext(UserProgressContext);
  const cartTotal = items.reduce(
    (totalPrice, item) => (totalPrice + +item.price) * item.quantity,
    0
  );

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", resquestConfig);

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          ...items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={hideCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={clearCart}>
        <h2>Success!</h2>
        <p>Your order was submitted successfuly</p>
        <p>
          We will back to you with more details via email within the next few
          minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <form method="dialog" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input id="name" label="Full name" type="text" />
        <Input id="email" label="E-Mail Adress" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="number" />
          <Input id="city" label="City" type="text" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
