import { toast } from "sonner";
import {
  useCartQuery,
  useDeleteCartItemMutation,
} from "../store/products-store";

const Basket = () => {
  const { data: cartItems, isLoading, error } = useCartQuery();
  const deleteCartItemMutation = useDeleteCartItemMutation();

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

  if (isLoading) {
    return <div className="loading">Загрузка корзины...</div>;
  }

  if (error) {
    return <div className="error">Ошибка загрузки корзины</div>;
  }

  const items = Array.isArray(cartItems) ? cartItems : [];

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

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
          const title = item.title || item.name;
          const loading = isDeleting(item._id || item.productId);

          return (
            <div key={item._id || item.productId} className="basket-item">
              <img
                src={item.image}
                alt={title}
                className="basket-item-image"
              />
              <div className="basket-item-info">
                <h3 className="basket-item-title">{title}</h3>
                <p className="basket-item-description">{item.description}</p>
                <span className="basket-item-price">{item.price} сом</span>
              </div>
              <button
                className="basket-item-delete"
                type="button"
                disabled={loading}
                onClick={() => handleDeleteItem(item._id || item.productId)}
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
    </div>
  );
};

export default Basket;