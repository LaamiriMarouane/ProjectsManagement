import { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import ErrorPage from "./pages/error/ErrorPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgoutPassPage from "./pages/auth/ForgotPassPage";
import NavBar from "./pages/components/navBars/NavBar";
import NavBarLayout from "./pages/Layout/NavBarLayout";
import AdminPlateformPage from "./pages/Admins/AdminPlateformPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <NavBar /> */}
      <Route element={<PrivateRoutes navto="/login" isLogedIn={true} />}>
        <Route path="/" element={<div>home</div>} />
        <Route path="/home" element={<div>home</div>} />
      </Route>

      <Route element={<PrivateRoutes navto="/home" isLogedIn={false} />}>
        <Route path="/" element={<NavBarLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgoutPassPage />} />
          <Route path="/admin" element={<AdminPlateformPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
