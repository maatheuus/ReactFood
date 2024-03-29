export async function fetchAvailableMeals() {
  const request = await fetch("http://localhost:3000/meals");

  const response = await request.json();

  return response;
}
