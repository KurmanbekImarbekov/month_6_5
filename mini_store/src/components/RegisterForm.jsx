import { useState } from "react";
import { useRegisterMutation } from "../store/auth-store";
import "./AuthForm.css";

const RegisterForm = () => {
  const registerMutation = useRegisterMutation();
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
    registerMutation.mutate(formData);
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
          placeholder="Придумайте логин"
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
          placeholder="Минимум 6 символов"
          autoComplete="new-password"
          minLength={6}
          required
        />
      </label>

      <button
        className="auth-submit"
        type="submit"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Создаем..." : "Зарегистрироваться"}
      </button>
    </form>
  );
};

export default RegisterForm;
