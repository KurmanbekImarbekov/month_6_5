import { toast } from "sonner";
import {
  useFavoritesQuery,
  useDeleteFavoriteMutation,
  useAddToCartMutation,
} from "../store/products-store";

const getErrorMessage = (error, fallback) => {
  if (error?.response?.status === 401) {
    return "Пожалуйста, войдите в систему или зарегистрируйтесь";
  }
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const Favorites = () => {
  const { data: favorites, isLoading, error } = useFavoritesQuery();
  const deleteFavoriteMutation = useDeleteFavoriteMutation();
  const addToCartMutation = useAddToCartMutation();

  const handleDeleteFavorite = (productId) => {
    deleteFavoriteMutation.mutate(productId, {
      onError: (error) => {
        toast.error(getErrorMessage(error, "Не удалось удалить из избранного"));
      },
    });
  };

  const handleAddToCart = (productId) => {
    addToCartMutation.mutate(productId, {
      onError: (error) => {
        toast.error(getErrorMessage(error, "Не удалось добавить товар в корзину"));
      },
    });
  };

  const isDeleting = (productId) =>
    deleteFavoriteMutation.isPending &&
    deleteFavoriteMutation.variables === productId;

  const isCartLoading = (productId) =>
    addToCartMutation.isPending &&
    addToCartMutation.variables === productId;

  if (isLoading) {
    return <div className="loading">Загрузка избранного...</div>;
  }

  if (error) {
    return <div className="error">Ошибка загрузки избранного</div>;
  }

  const items = Array.isArray(favorites) ? favorites : [];

  if (items.length === 0) {
    return (
      <div className="favorites-container">
        <h1>Избранное</h1>
        <p className="favorites-empty">Список избранного пуст</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Избранное</h1>

      <div className="products-grid">
        {items.map((item) => {
          const title = item.title || item.name;
          const productId = item._id || item.productId;
          const deleting = isDeleting(productId);
          const cartLoading = isCartLoading(productId);

          return (
            <div key={productId} className="product-card">
              <div className="product-image-wrapper">
                <img src={item.image} alt={title} className="product-image" />
                <button
                  className="favorite-button favorite-button-active"
                  type="button"
                  aria-label="Удалить из избранного"
                  disabled={deleting}
                  onClick={() => handleDeleteFavorite(productId)}
                >
                  ♥
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{title}</h3>
                <p className="product-description">{item.description}</p>
                <div className="product-footer">
                  <span className="product-price">{item.price} сом</span>
                  <button
                    className="btn-add-to-cart"
                    type="button"
                    disabled={cartLoading}
                    onClick={() => handleAddToCart(productId)}
                  >
                    {cartLoading ? "..." : "В корзину"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;