import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import Button from "./Button";

function MealsItems({ isLoading, mealsItems, fallBackText }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div id="meals">
      {isLoading && <p>{fallBackText}</p>}
      {!isLoading &&
        mealsItems.length > 0 &&
        mealsItems.map((items) => {
          return (
            <div key={items.id} className="meal-item">
              <img src={`http://localhost:3000/${items.image}`} alt="" />
              <h3>{items.name}</h3>
              <div className="meal-item-price">$${items.price}</div>
              <div className="meal-item-description">{items.description}</div>
              <div className="meal-item-actions">
                <Button onClick={() => addToCart(items)} className="button">
                  Add to cart
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MealsItems;
