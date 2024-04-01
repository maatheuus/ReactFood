import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import Button from "./Button";

function CartItems() {
  const { items, totalItemsFixed, addToCart, removeToCart } =
    useContext(CartContext);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.length === 0 && <p>Nothing here yet... </p>}
        {items.length > 0 &&
          items.map((meal) => {
            return (
              <li key={meal.id}>
                <div className="cart-item">
                  <p>
                    <span> {meal.name} </span>- <span>{meal.quantity} x </span>
                    <span>${meal.price}</span>
                  </p>

                  <div className="cart-item-actions">
                    <Button onClick={() => removeToCart(meal)}>-</Button>
                    <span>{meal.quantity}</span>
                    <Button onClick={() => addToCart(meal)}>+</Button>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <p className="cart-total ">${totalItemsFixed}</p>
    </div>
  );
}

export default CartItems;
