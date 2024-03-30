import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import Button from "./Button";

function CartItems() {
  const { items, addToCart, removeToCart } = useContext(CartContext);

  const totalItems = items.reduce(
    (amount, currentPrice) =>
      (amount + +currentPrice.price) * +currentPrice.quantity,
    0
  );
  const totalItemsFixed = totalItems.toFixed(2);

  return (
    <div className="cart">
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
