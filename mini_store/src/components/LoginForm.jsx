import { useState } from "react";
import { useLoginMutation } from "../store/auth-store";
import "./AuthForm.css";

const LoginForm = () => {
  const loginMutation = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
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
          placeholder="Введите пароль"
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
