import Cart from "./Components/Cart";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
import CartProvider from "./context/cart-context";
import ModalProvider from "./context/modal-context";
function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <Header />
        <Meals />
        <Cart />
      </CartProvider>
    </ModalProvider>
  );
}

export default App;
