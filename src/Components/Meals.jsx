// import { useEffect, useState } from "react";
import MealsItems from "./MealsItems";
import { fetchAvailableMeals } from "../http";
import { useFetch } from "../hooks/useFetch";

function Meals() {
  const { isLoading, mealsItems } = useFetch(fetchAvailableMeals);

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
