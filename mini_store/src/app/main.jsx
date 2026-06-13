import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes.jsx";
import { Providers } from "./providers.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <Providers>
    <RouterProvider router={routes} />
  </Providers>,
);
