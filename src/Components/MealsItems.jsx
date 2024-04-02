import { useContext } from "react";
import { currencyFormatter } from "../formatting";
import Button from "./Button";
import CartContext from "../context/CartContext";

function MealItem({ meal }) {
  const { addItems } = useContext(CartContext);

  return (
    <li key={meal.id} className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />

        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>

        <p className="meal-item-actions">
          <Button onClick={() => addItems(meal)}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
