import imageLogo from "../assets/logo.jpg";
import Button from "./Button";

function Header() {
  return (
    <header id="main-header">
      <h1 id="title">
        <img src={imageLogo} alt="image logo of the site" />
        ReactFood
      </h1>
      <Button className="button">Cart (3)</Button>
    </header>
  );
}

export default Header;
