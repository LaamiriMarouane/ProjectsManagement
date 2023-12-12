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
import NavBarLayout from "./pages/Layout/NavBarLayout";
import AdminPlateformNewDemandsPage from "./pages/Actors/Admins/demandsPages/AdminPlateformNewDemandsPage";
import AdminPlateformRejectedDemandsPage from "./pages/Actors/Admins/demandsPages/AdminPlateformRejectedDemandsPage";
import AdminPlateformAcceptedDemandsPage from "./pages/Actors/Admins/demandsPages/AdminPlateformAcceptedDemandsPage";
import SideBarLayout from "./pages/Layout/SideBarLayout";
import ConsultPage from "./pages/Actors/Users/demandsPages/ConsultPage";
import UserEventsPage from "./pages/Actors/Users/Events/userEventsPage";
import TabsProjectDetailsLayout from "./pages/Layout/TabsProjectDetailsLayout";
import ProjectDetailsPage from "./pages/Project/ProjectDetailsPage";
import MembresPages from "./pages/Project/MembresPages";
import HomePage from "./pages/Home/HomePage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PrivateRoutes navto="/login" isLogedIn={true} />}>
        <Route path="/" element={<NavBarLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/details" element={<ProjectDetailsPage />} />
          <Route path="/" element={<SideBarLayout />}>
            <Route path="/user/demands" element={<ConsultPage />} />
            <Route path="/user/agenda" element={<UserEventsPage />} />
            <Route path="/user/details" element={<TabsProjectDetailsLayout />} >
              <Route path="/user/details" element={<ProjectDetailsPage />} />
              <Route path="/user/details/ressources" element={<h1>Ressource</h1>} />
              <Route path="/user/details/agenda" element={<h1>Agenda</h1>} />
              <Route path="/user/details/membres" element={<MembresPages />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route element={<PrivateRoutes navto="/login" isLogedIn={true} />}>
        <Route path="/" element={<NavBarLayout />}>
          <Route
            path="/admin/demands/"
            element={<AdminPlateformNewDemandsPage />}
          />
          <Route
            path="/admin/demands/new"
            element={<AdminPlateformNewDemandsPage />}
          />
          <Route
            path="/admin/demands/rejected"
            element={<AdminPlateformRejectedDemandsPage />}
          />
          <Route
            path="/admin/demands/accepted"
            element={<AdminPlateformAcceptedDemandsPage />}
          />
          <Route path="/admin/projects" element={<div>home</div>} />
        </Route>
      </Route>

      <Route element={<PrivateRoutes navto="/home" isLogedIn={false} />}>
        <Route path="/" element={<NavBarLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgoutPassPage />} />
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
