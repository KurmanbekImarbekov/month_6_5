import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useAddToCartMutation,
  useProductsQuery,
  useCategoriesQuery,
} from "../store/products-store";
import "./home.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;
  if (minPrice) params.minPrice = Number(minPrice);
  if (maxPrice) params.maxPrice = Number(maxPrice);

  const { data, isLoading, error } = useProductsQuery(params);
  const { data: categories } = useCategoriesQuery();
  const addFavoriteMutation = useAddFavoriteMutation();
  const deleteFavoriteMutation = useDeleteFavoriteMutation();
  const addToCartMutation = useAddToCartMutation();

  const updateParam = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    });
  };

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

  const products = Array.isArray(data) ? data : data?.data ?? [];
  const categoryList = Array.isArray(categories) ? categories : [];

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

      <div className="filters-bar">
        <div className="filter-group">
          <input
            className="filter-input"
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={(e) => updateParam("search", e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            className="filter-select"
            value={category}
            onChange={(e) => updateParam("category", e.target.value)}
          >
            <option value="">Все категории</option>
            {categoryList.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group filter-price">
          <input
            className="filter-input filter-input-small"
            type="number"
            placeholder="Цена от"
            value={minPrice}
            onChange={(e) => updateParam("minPrice", e.target.value)}
            min={0}
          />
          <span className="filter-price-separator">—</span>
          <input
            className="filter-input filter-input-small"
            type="number"
            placeholder="Цена до"
            value={maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            min={0}
          />
        </div>

        {(search || category || minPrice || maxPrice) && (
          <button
            className="filter-clear"
            type="button"
            onClick={() => setSearchParams({})}
          >
            Сбросить
          </button>
        )}
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">Товары не найдены</div>
        ) : (
          products.map((product) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default Home;