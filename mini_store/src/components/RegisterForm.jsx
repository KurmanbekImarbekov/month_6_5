import { useState } from "react";
import { useRegisterMutation } from "../store/auth-store";
import "./AuthForm.css";

const RegisterForm = () => {
  const registerMutation = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        <span>Имя</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          required
        />
      </label>

      <label className="auth-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@mail.com"
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
