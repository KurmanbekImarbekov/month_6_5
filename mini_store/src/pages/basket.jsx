import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./basket.css";
import {
  useCartQuery,
  useDeleteCartItemMutation,
  useCreateOrderMutation,
  useClearCartMutation,
} from "../store/products-store";

const Basket = () => {
  const navigate = useNavigate();
  const { data: cartItems, isLoading, error } = useCartQuery();
  const deleteCartItemMutation = useDeleteCartItemMutation();
  const createOrderMutation = useCreateOrderMutation();
  const clearCartMutation = useClearCartMutation();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const handleDeleteItem = (productId) => {
    deleteCartItemMutation.mutate(productId, {
      onError: () => {
        toast.error("Не удалось удалить товар из корзины");
      },
    });
  };

  const isDeleting = (productId) =>
    deleteCartItemMutation.isPending &&
    deleteCartItemMutation.variables === productId;

  const validateForm = () => {
    const newErrors = {};
    if (!deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Адрес доставки обязателен";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const items = (Array.isArray(cartItems) ? cartItems : []).map((item) => ({
      productId: item.product?._id,
      quantity: item.quantity || 1,
      price: item.product?.price || 0,
    }));

    const orderData = {
      items,
      deliveryAddress: deliveryAddress.trim(),
      ...(comment.trim() && { comment: comment.trim() }),
    };

    createOrderMutation.mutate(orderData, {
      onSuccess: () => {
        clearCartMutation.mutate(undefined, {
          onSuccess: () => {
            toast.success("Заказ успешно оформлен!");
            navigate("/orders");
          },
        });
      },
      onError: () => {
        toast.error("Не удалось оформить заказ");
      },
    });
  };

  if (isLoading) {
    return <div className="loading">Загрузка корзины...</div>;
  }

  if (error) {
    return <div className="error">Ошибка загрузки корзины</div>;
  }

  const items = Array.isArray(cartItems) ? cartItems : [];

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0,
  );

  const isFormValid =
    deliveryAddress.trim().length > 0 &&
    items.length > 0 &&
    !createOrderMutation.isPending;

  if (items.length === 0) {
    return (
      <div className="basket-container">
        <h1>Корзина</h1>
        <p className="basket-empty">Корзина пуста</p>
      </div>
    );
  }

  return (
    <div className="basket-container">
      <h1>Корзина</h1>

      <div className="basket-items">
        {items.map((item) => {
          const product = item.product;
          const loading = isDeleting(product._id);

          return (
            <div key={product._id} className="basket-item">
              <img
                src={product.image}
                alt={product.name}
                className="basket-item-image"
              />
              <div className="basket-item-info">
                <h3 className="basket-item-title">{product.name}</h3>
                <span className="basket-item-price">{product.price} сом</span>
                <span className="basket-item-quantity">
                  Количество: {item.quantity}
                </span>
              </div>
              <button
                className="basket-item-delete"
                type="button"
                disabled={loading}
                onClick={() => handleDeleteItem(product._id)}
              >
                {loading ? "Удаление..." : "Удалить"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="basket-total">
        <span className="basket-total-label">Итого:</span>
        <span className="basket-total-price">{totalPrice} сом</span>
      </div>

      <div className="order-form">
        <h2 className="order-form-title">Оформление заказа</h2>

        <div className="order-form-group">
          <label className="order-form-label" htmlFor="deliveryAddress">
            Адрес доставки *
          </label>
          <input
            id="deliveryAddress"
            className={`order-form-input ${errors.deliveryAddress ? "order-form-input-error" : ""}`}
            type="text"
            placeholder="г. Бишкек, ул. Киевская 120"
            value={deliveryAddress}
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
              if (errors.deliveryAddress) {
                setErrors((prev) => ({ ...prev, deliveryAddress: "" }));
              }
            }}
          />
          {errors.deliveryAddress && (
            <span className="order-form-error">{errors.deliveryAddress}</span>
          )}
        </div>

        <div className="order-form-group">
          <label className="order-form-label" htmlFor="comment">
            Комментарий
          </label>
          <textarea
            id="comment"
            className="order-form-textarea"
            placeholder="Позвонить за час"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </div>

        <button
          className="order-form-submit"
          type="button"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          {createOrderMutation.isPending ? "Отправка..." : "Оформить заказ"}
        </button>
      </div>
    </div>
  );
};

export default Basket;