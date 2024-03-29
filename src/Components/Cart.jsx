import Button from "./Button";
import Modal from "./Modal";

function Cart() {
  return (
    <>
      <Modal
        title="Your Cart"
        cart={
          <div className="cart">
            <ul>
              <li>
                <div className="cart-item">
                  <p>ITEMS</p>
                  <div className="cart-item-actions">
                    <Button>+</Button>
                    <span>1</span>
                    <Button>-</Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        }
        actions={
          <>
            <Button className="text-button">Close</Button>
            <Button className="button">Go to Checkout</Button>
          </>
        }
      />
    </>
  );
}

export default Cart;
