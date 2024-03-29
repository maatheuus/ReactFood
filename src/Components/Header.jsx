import { useContext } from "react";
import { CartContext } from "../context/cart-context";

import imageLogo from "../assets/logo.jpg";
import Button from "./Button";
import { ModalContext } from "../context/modal-context";

function Header() {
  const { items } = useContext(CartContext);
  const { open } = useContext(ModalContext);
  return (
    <header id="main-header">
      <h1 id="title">
        <img src={imageLogo} alt="image logo of the site" />
        ReactFood
      </h1>
      <Button onClick={open} className="text-button">
        Cart ({items?.length})
      </Button>
    </header>
  );
}

export default Header;
