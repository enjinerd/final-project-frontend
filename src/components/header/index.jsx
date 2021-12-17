import "@/components/header/styles.css";
import Logo from "@/components/ui/header/logo";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
}

export default Header;
