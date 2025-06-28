import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home/home";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./AuthRoutes/private";
import Login from "./pages/Login/login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="home" element={<Home />} />
      </Route>

      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
