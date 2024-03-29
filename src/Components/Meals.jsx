import { useEffect, useState } from "react";
import MealsItems from "./MealsItems";
import { fetchAvailableMeals } from "../http";

function Meals() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealsItems, setMealsItems] = useState([]);

  useEffect(() => {
    async function mealsFn() {
      setIsLoading(true);
      const meals = await fetchAvailableMeals();

      setMealsItems(meals);
      setIsLoading(false);
    }
    mealsFn();
  }, []);

  return (
    <main>
      <MealsItems
        isLoading={isLoading}
        mealsItems={mealsItems}
        fallBackText="Fetching your meals"
      />
    </main>
  );
}

export default Meals;
