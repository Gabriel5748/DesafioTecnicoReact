import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home/home";
// import Treino from "./pages/Treino";
// import TaskPage from "./pages/Treino/TreinoPages/task_page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Produtos from "./pages/Produtos/produtos";
import Clientes from "./pages/Clientes/clientes";
import Pedidos from "./pages/Pedidos/pedidos";
import Login from "./pages/Login/login";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Treino />,
  // },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  // {
  //   path: "/clientes",
  //   element: <Clientes />,
  // },
  // {
  //   path: "/produtos",
  //   element: <Produtos />,
  // },
  // {
  //   path: "/pedidos",
  //   element: <Pedidos />,
  // },
  // {
  //   path: "/task",
  //   element: <TaskPage />,
  // },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
