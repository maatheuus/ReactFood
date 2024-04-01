import { useEffect, useState } from "react";

export function useFetch(fetchFunc) {
  const [isLoading, setIsLoading] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [mealsItems, setMealsItems] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetchFunc(order);
        setMealsItems(response);

        if (order !== null) {
          const submittedOrder = response;
          setMessageSuccess(true);

          return submittedOrder;
        }
      } catch (error) {
        throw new Error(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [fetchFunc, order]);

  return {
    setOrder,
    messageSuccess,
    isLoading,
    mealsItems,
  };
}
