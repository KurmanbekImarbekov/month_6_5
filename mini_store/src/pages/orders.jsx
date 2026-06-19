import "./orders.css";
import { useOrdersQuery } from "../store/products-store";

const statusLabels = {
  pending: "Ожидает обработки",
  processing: "В обработке",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменён",
};

const statusColors = {
  pending: "#f39c12",
  processing: "#3498db",
  shipped: "#9b59b6",
  delivered: "#27ae60",
  cancelled: "#e74c3c",
};

const Orders = () => {
  const { data: orders, isLoading, error } = useOrdersQuery();

  if (isLoading) {
    return <div className="loading">Загрузка заказов...</div>;
  }

  if (error) {
    return <div className="error">Ошибка загрузки заказов</div>;
  }

  const orderList = Array.isArray(orders) ? orders : [];

  if (orderList.length === 0) {
    return (
      <div className="basket-container">
        <h1>Мои заказы</h1>
        <p className="basket-empty">У вас пока нет заказов</p>
      </div>
    );
  }

  return (
    <div className="basket-container">
      <h1>Мои заказы</h1>

      <div className="orders-list">
        {orderList.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-header-left">
                <span className="order-id">Заказ #{order._id.slice(-6)}</span>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <span
                className="order-status"
                style={{ color: statusColors[order.status] || "#888" }}
              >
                {statusLabels[order.status] || order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  {item.product?.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="order-item-image"
                    />
                  )}
                  <div className="order-item-info">
                    <span className="order-item-name">
                      {item.product?.name || "Товар"}
                    </span>
                    <span className="order-item-details">
                      {item.quantity} x {item.price} сом
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <span className="order-address">
                Адрес: {order.deliveryAddress}
              </span>
              <span className="order-total">
                Итого: {order.totalPrice} сом
              </span>
            </div>

            {order.comment && (
              <div className="order-comment">
                Комментарий: {order.comment}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;