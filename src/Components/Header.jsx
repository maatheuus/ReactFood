import { useContext } from "react";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";

import imageLogo from "../assets/logo.jpg";
import Button from "./Button";

function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={imageLogo} alt="image logo of the site" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
