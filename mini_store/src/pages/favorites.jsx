import { toast } from "sonner";
import "./favorit.css";
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
        toast.error(
          getErrorMessage(error, "Не удалось добавить товар в корзину"),
        );
      },
    });
  };

  const isDeleting = (productId) =>
    deleteFavoriteMutation.isPending &&
    deleteFavoriteMutation.variables === productId;

  const isCartLoading = (productId) =>
    addToCartMutation.isPending && addToCartMutation.variables === productId;

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

      <div className="favorites-grid">
        {items.map((product) => {
          const deleting = isDeleting(product._id);
          const cartLoading = isCartLoading(product._id);

          return (
            <div key={product._id} className="favorite-card">
              <div className="favorite-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="favorite-image"
                />
                <button
                  className="favorite-button favorite-button-active"
                  type="button"
                  aria-label="Удалить из избранного"
                  disabled={deleting}
                  onClick={() => handleDeleteFavorite(product._id)}
                >
                  ♥
                </button>
              </div>
              <div className="favorite-info">
                <h3 className="favorite-title">{product.name}</h3>
                <div className="favorite-footer">
                  <span className="favorite-price">{product.price} сом</span>
                  <button
                    className="btn-add-to-cart"
                    type="button"
                    disabled={cartLoading}
                    onClick={() => handleAddToCart(product._id)}
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
