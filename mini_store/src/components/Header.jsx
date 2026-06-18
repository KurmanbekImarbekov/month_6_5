import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          ShopLab
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">
            Главная
          </Link>
          <Link to="/basket" className="nav-link">
            Корзина
          </Link>
          <Link to="/favorites" className="nav-link">
            Избранное
          </Link>
          <Link to="/orders" className="nav-link">
            Заказы
          </Link>
          <Link to="/auth" className="nav-link">
            Профиль
          </Link>
        </nav>

        <div className="header-actions">
          <div className="cart-icon">
            <span className="cart-count">0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
