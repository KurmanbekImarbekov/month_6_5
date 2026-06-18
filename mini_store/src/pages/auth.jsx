import { useState } from "react";
import { toast } from "sonner";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../hooks/use-auth";
import "./auth.css";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const { isAuth, clearAuth } = useAuth();

  const handleLogout = () => {
    clearAuth();
    toast.success("Вы вышли из аккаунта");
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        {isAuth ? (
          <div className="auth-logged">
            <h1 className="auth-title">Вы уже вошли</h1>
            <p className="auth-subtitle">
              Теперь можно добавлять товары в избранное и пользоваться
              защищенными запросами.
            </p>
            <button className="auth-submit" type="button" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        ) : (
          <>
            <h1 className="auth-title">
              {mode === "login" ? "Вход" : "Регистрация"}
            </h1>
            <p className="auth-subtitle">
              {mode === "login"
                ? "Войдите, чтобы сохранять товары в избранное."
                : "Создайте аккаунт, чтобы пользоваться избранным."}
            </p>

            <div className="auth-tabs">
              <button
                className={`auth-tab ${mode === "login" ? "auth-tab-active" : ""}`}
                type="button"
                onClick={() => setMode("login")}
              >
                Войти
              </button>
              <button
                className={`auth-tab ${
                  mode === "register" ? "auth-tab-active" : ""
                }`}
                type="button"
                onClick={() => setMode("register")}
              >
                Регистрация
              </button>
            </div>

            {mode === "login" ? <LoginForm /> : <RegisterForm />}
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
