import { toast } from "sonner";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useAddToCartMutation,
  useProductsQuery,
} from "../store/products-store";
import "./home.css";

const Home = () => {
  const { data, isLoading, error } = useProductsQuery();
  const addFavoriteMutation = useAddFavoriteMutation();
  const deleteFavoriteMutation = useDeleteFavoriteMutation();
  const addToCartMutation = useAddToCartMutation();

  const handleFavoriteError = (error) => {
    if (error?.response?.status === 401) {
      toast.error("Пожалуйста, войдите в систему или зарегистрируйтесь");
      return;
    }

    toast.error("Не удалось обновить избранное");
  };

  const handleToggleFavorite = (product) => {
    const mutation = product.isFavorite
      ? deleteFavoriteMutation
      : addFavoriteMutation;

    mutation.mutate(product._id, {
      onError: handleFavoriteError,
    });
  };

  const handleAddToCart = (productId) => {
    addToCartMutation.mutate(productId, {
      onError: (error) => {
        if (error?.response?.status === 401) {
          toast.error("Пожалуйста, войдите в систему или зарегистрируйтесь");
          return;
        }
        const message =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Не удалось добавить товар в корзину";
        toast.error(message);
      },
    });
  };

  const isFavoriteLoading = (productId) =>
    (addFavoriteMutation.isPending &&
      addFavoriteMutation.variables === productId) ||
    (deleteFavoriteMutation.isPending &&
      deleteFavoriteMutation.variables === productId);

  const isCartLoading = (productId) =>
    addToCartMutation.isPending &&
    addToCartMutation.variables === productId;

  if (isLoading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  if (error) {
    return <div className="error">Ошибка загрузки товаров</div>;
  }

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Добро пожаловать в магазин</h1>
        <p>Найди лучшие товары по отличным ценам</p>
      </div>

      <div className="products-grid">
        {Array.isArray(data) &&
          data.map((product) => {
            const title = product.title || product.name;
            const isFavorite = Boolean(product.isFavorite);
            const favoriteLoading = isFavoriteLoading(product._id);

            return (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={title} className="product-image" />
                  <button
                    className={`favorite-button ${
                      isFavorite ? "favorite-button-active" : ""
                    }`}
                    type="button"
                    aria-label={
                      isFavorite
                        ? "Удалить из избранного"
                        : "Добавить в избранное"
                    }
                    disabled={favoriteLoading}
                    onClick={() => handleToggleFavorite(product)}
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{title}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{product.price} сом</span>
                    <button
                      className="btn-add-to-cart"
                      type="button"
                      disabled={isCartLoading(product._id)}
                      onClick={() => handleAddToCart(product._id)}
                    >
                      {isCartLoading(product._id) ? "..." : "В корзину"}
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

export default Home;
