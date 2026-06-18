import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { isAuth, clearAuth } = useAuth();

  const handleLogout = () => {
    clearAuth();
    toast.success("Вы вышли из аккаунта");
    navigate("/");
  };

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
        </nav>

        <div className="header-actions">
          {isAuth ? (
            <button className="auth-header-button" type="button" onClick={handleLogout}>
              Выйти
            </button>
          ) : (
            <Link to="/auth" className="auth-header-button">
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
