# 🛒 ShopLab Store - E-commerce приложение

Это учебный проект магазина, созданный с использованием React, React Router, React Query и Axios.

## 🎯 Цели проекта

- ✅ Интеграция с REST API (shoplab-geeks.vercel.app)
- ✅ Использование React Query для управления данными
- ✅ Создание красивого UI с CSS Grid
- ✅ Реализация Header с навигацией
- ✅ Понимание логики API запросов

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск dev сервера

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`

### Продакшн сборка

```bash
npm run build
```

---

## 📁 Структура проекта

```
src/
├── api/
│   └── axios.js           # Настройка HTTP клиента
├── app/
│   ├── LayOut.jsx         # Главный layout с Header
│   ├── main.jsx           # Точка входа
│   ├── routes.jsx         # Маршруты приложения
│   ├── providers.jsx      # React Query провайдер
│   └── index.css          # Глобальные стили
├── components/
│   ├── Header.jsx         # Компонент навигации
│   └── Header.css         # Стили Header
├── pages/
│   ├── home.jsx           # Главная страница (список товаров)
│   ├── home.css           # Стили Home
│   ├── basket.jsx         # Страница корзины
│   ├── favorites.jsx      # Избранное
│   ├── orders.jsx         # Заказы
│   └── auth.jsx           # Авторизация
├── store/
│   └── product-store.js   # Custom hook для товаров
└── hooks/
    └── useProductsQuery.js # React Query хук
```

---

## 🔧 Технологии

| Технология   | Версия                | Назначение                    |
| ------------ | --------------------- | ----------------------------- |
| React        | 18+                   | UI библиотека                 |
| React Router | 6+                    | Маршрутизация                 |
| React Query  | @tanstack/react-query | Управление состоянием сервера |
| Axios        | Latest                | HTTP клиент                   |
| Vite         | 8+                    | Сборщик и dev сервер          |
| CSS          | 3                     | Стилизация                    |

---

## 📡 API Endpoints

### Получить все товары

```
GET https://shoplab-geeks.vercel.app/products
```

**Ответ:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Товар 1",
    "description": "Описание",
    "price": 99.99,
    "image": "https://...",
    "quantity": 10
  }
]
```

Полная документация API: см. [API_DOCS.md](./API_DOCS.md)

---

## 🎨 Компоненты

### Header

- Логотип и навигация
- Ссылки на все страницы
- Счетчик товаров в корзине
- Responsive дизайн

### Home (Главная страница)

- Отображение товаров в grid
- Loading и Error состояния
- Добавление товаров в корзину
- Красивые карточки товаров

### Navigation

- Главная (/home)
- Корзина (/basket)
- Избранное (/favorites)
- Заказы (/orders)
- Профиль (/auth)

---

## 🧰 Как использовать React Query

### Создание custom хука

```javascript
import { useQuery } from "@tanstack/react-query";
import { mainApi } from "../api/axios";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await mainApi.get("/products");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 минут
  });
};
```

### Использование в компоненте

```javascript
import { useProductsQuery } from "../store/product-store";

const Home = () => {
  const { data, isLoading, error } = useProductsQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка!</div>;

  return (
    <div>
      {data?.map((product) => (
        <div key={product._id}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};
```

---

## 🧪 Тестирование API в Postman

1. Скачай [Postman](https://www.postman.com/downloads/)
2. Создай новый GET запрос
3. Вставь URL: `https://shoplab-geeks.vercel.app/products`
4. Нажми Send
5. Посмотри JSON ответ

**Подробнее:** см. [API_DOCS.md](./API_DOCS.md)

---

## 🎓 Обучение

### Как переписать код самостоятельно

- Пересмотри урок несколько раз
- Напиши весь код заново БЕЗ копирования
- Разберись в КАЖДОЙ строке
- Экспериментируй и меняй

**Подробный гайд:** см. [LEARNING_GUIDE.md](./LEARNING_GUIDE.md)

---

## 🐛 Часто встречающиеся ошибки

### "useProductsQuery is not defined"

- Проверь что файл product-store.js экспортирует функцию
- Проверь правильность импорта в Home.jsx

### "CORS ошибка"

- Проверь что в vite.config.js есть proxy
- Убедись что baseURL правильный в axios.js

### "Товары не загружаются"

- Открой DevTools (F12)
- Посмотри Network tab
- Проверь статус запроса (должен быть 200)
- Посмотри JSON ответ

---

## 📚 Полезные ссылки

- [React документация](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [React Query (TanStack Query)](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Vite](https://vitejs.dev/)

---

## 📝 Todos

- [ ] Реализовать функциональность корзины
- [ ] Добавить фильтрацию товаров по категориям
- [ ] Реализовать поиск товаров
- [ ] Добавить Zustand для глобального состояния
- [ ] Реализовать авторизацию
- [ ] Добавить интеграцию с платежами

---

**Вопросы?** Смотри [API_DOCS.md](./API_DOCS.md) и [LEARNING_GUIDE.md](./LEARNING_GUIDE.md)
