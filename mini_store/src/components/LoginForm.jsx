import { useState } from "react";
import { useLoginMutation } from "../store/auth-store";
import "./AuthForm.css";

const LoginForm = () => {
  const loginMutation = useLoginMutation();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-field">
        <span>Логин</span>
        <input
          type="text"
          name="login"
          value={formData.login}
          onChange={handleChange}
          placeholder="Введите логин"
          autoComplete="username"
          required
        />
      </label>

      <label className="auth-field">
        <span>Пароль</span>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введите пароль"
          autoComplete="current-password"
          required
        />
      </label>

      <button
        className="auth-submit"
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Входим..." : "Войти"}
      </button>
    </form>
  );
};

export default LoginForm;
