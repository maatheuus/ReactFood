export async function fetchAvailableMeals() {
  const request = await fetch("http://localhost:3000/meals");

  if (!request.ok) throw new Error("Couldn't fetch available meals");

  const response = await request.json();

  return response;
}

export async function fetchSubmittedOrder(order) {
  const header = {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const request = await fetch("http://localhost:3000/orders", header);

  if (!request.ok) throw new Error(request.message);

  const response = await request.json();

  return response;
}
