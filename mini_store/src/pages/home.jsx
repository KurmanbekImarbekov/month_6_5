import React from "react";
import { useProductsQuery } from "../store/product-store";
import "./home.css";

const Home = () => {
  const { data, isLoading, error } = useProductsQuery();

  if (isLoading) {
    return <div className="loading">⏳ Загрузка товаров...</div>;
  }

  if (error) {
    return <div className="error">❌ Ошибка загрузки товаров</div>;
  }

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>🛍️ Добро пожаловать в магазин</h1>
        <p>Найди лучшие товары по отличным ценам</p>
      </div>

      <div className="products-grid">
        {Array.isArray(data) &&
          data.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <button className="btn-add-to-cart">В корзину</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
