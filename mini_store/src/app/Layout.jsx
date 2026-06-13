import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "./index.css";

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
