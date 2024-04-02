import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
import { CartProvider } from "./context/CartContext";
import { UserProgressProvider } from "./context/UserProgressContext";

function App() {
  return (
    <CartProvider>
      <UserProgressProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserProgressProvider>
    </CartProvider>
  );
}

export default App;
