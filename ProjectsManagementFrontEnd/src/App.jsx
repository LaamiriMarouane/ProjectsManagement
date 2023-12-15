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
import HomePage from "./pages/Home/HomePage";
import ProjectEventsPage from "./pages/Actors/Users/Events/ProjectEventsPage";
import NavSideBarLayout from "./pages/Layout/NavSideBarLayout";
import InvitPage from "./pages/Project/InvitPage";
import RecevedInvitationsPage from "./pages/Project/RecevedInvitationsPage";
import ProjectDetailsPage from "./pages/Project/ProjectDetailsPage";
import MembresPages from "./pages/Project/MembresPages";
import UserProjectsPage from "./pages/Actors/Users/Project/UserProjectsPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<PrivateRoutes navto="/login" isLogedIn={true} />}>
        <Route path="/" element={<NavSideBarLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<HomePage />} />
          <Route path="/user/" element={<SideBarLayout />}>
            <Route path="/user/demands" element={<ConsultPage />} />
            <Route path="/user/projects" element={<UserProjectsPage />} />
            <Route path="/user/agenda" element={<UserEventsPage />} />
            <Route path="/user/invit" element={<RecevedInvitationsPage />} />
          </Route>
          <Route element={<SideBarLayout />}>
            <Route element={<TabsProjectDetailsLayout />}>
              <Route path="/projects/:id" element={<ProjectDetailsPage />} />
              <Route
                path="/projects/:id/ressources"
                element={<h1>Ressource</h1>}
              />
              <Route
                path="/projects/:id/agenda"
                element={<ProjectEventsPage />}
              />
              <Route path="/projects/:id/membres" element={<MembresPages />} />
              <Route path="/projects/:id/invit" element={<InvitPage />} />
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
