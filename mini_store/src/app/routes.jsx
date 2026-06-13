import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/home";
import Basket from "../pages/basket";
import Favorites from "../pages/favorites";
import Orders from "../pages/orders";
import Auth from "../pages/auth";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/basket", element: <Basket /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/orders", element: <Orders /> },
      { path: "/auth", element: <Auth /> },
    ],
  },
]);
