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
import ConsultPage from "./pages/Actors/Users/demandsPages/ConsultPage";
import UserEventsPage from "./pages/Actors/Users/Events/userEventsPage";
import TabsProjectDetailsLayout from "./pages/Layout/TabsProjectDetailsLayout";
import HomePage from "./pages/Home/HomePage";
import ProjectEventsPage from "./pages/Actors/Users/Events/ProjectEventsPage";
import NavSideBarLayout from "./pages/Layout/NavSideBarLayout";
import InvitPage from "./pages/Project/InvitPage";
import RecevedInvitationsPage from "./pages/Project/RecevedInvitationsPage";
import MembresPages from "./pages/Project/MembresPages";
import UserProjectsPage from "./pages/Actors/Users/Project/UserProjectsPage";
import AdminPlateformDashBordPage from "./pages/Actors/Admins/AdminPlateformDashBordPage";
import AdminPlateformAppUsersPage from "./pages/Actors/Admins/AdminPlateformAppUsersPage";
import ProjectDetailsPage from "./pages/project/ProjectDetailsPage";
import RessourcesPage from "./pages/project/RessourcesPage";
import UserChatPage from "./pages/Actors/Users/UserChatPage";

const allRoles = [
  "APP_USER",
  "APP_ADMIN",
  "PROJECT_ADMIN",
  "PROJECT_OWNER",
  "PROJECT_MEMBER",
  "GUEST",
];
const userRoles = [
  "APP_USER",
  "APP_ADMIN",
  "PROJECT_ADMIN",
  "PROJECT_OWNER",
  "PROJECT_MEMBER",
];
const projectRoles = ["PROJECT_ADMIN", "PROJECT_OWNER", "PROJECT_MEMBER"];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        element={
          <PrivateRoutes navto="/projects" roles={allRoles} isLogedIn={true} />
        }
      >
        <Route path="/" element={<NavSideBarLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<HomePage />} />
        </Route>
      </Route>

      <Route
        element={
          <PrivateRoutes navto="/projects" roles={allRoles} isLogedIn={true} />
        }
      >
        <Route path="/" element={<NavSideBarLayout />}>
          <Route element={<TabsProjectDetailsLayout />}>
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
            <Route
              path="/projects/:id/ressources"
              element={<RessourcesPage />}
            />
          </Route>
        </Route>

        <Route
          element={
            <PrivateRoutes
              navto="/projects"
              roles={projectRoles}
              isLogedIn={true}
            />
          }
        >
          <Route path="/" element={<NavSideBarLayout />}>
            <Route element={<TabsProjectDetailsLayout />}>
              <Route
                path="/projects/:id/agenda"
                element={<ProjectEventsPage />}
              />
              <Route path="/projects/:id/membres" element={<MembresPages />} />
              <Route path="/projects/:id/invitations" element={<InvitPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route
        element={
          <PrivateRoutes navto="/projects" roles={userRoles} isLogedIn={true} />
        }
      >
        <Route path="/" element={<NavSideBarLayout />}>
          <Route path="/user/demands" element={<ConsultPage />} />
          <Route path="/user/projects" element={<UserProjectsPage />} />
          <Route path="/user/agenda" element={<UserEventsPage />} />
          <Route path="/user/chat" element={<UserChatPage />} />
          <Route
            path="/user/invitations"
            element={<RecevedInvitationsPage />}
          />
        </Route>
      </Route>

      <Route
        element={
          <PrivateRoutes
            navto="/projects"
            roles={["APP_ADMIN"]}
            isLogedIn={true}
          />
        }
      >
        {" "}
        <Route path="/" element={<NavSideBarLayout />}>
          <Route
            path="/admin/dashbord"
            element={<AdminPlateformDashBordPage />}
          />
          <Route path="/admin/users" element={<AdminPlateformAppUsersPage />} />
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
        </Route>
      </Route>

      <Route element={<PrivateRoutes navto="/" isLogedIn={false} />}>
        <Route path="/" element={<NavBarLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgoutPassPage />} />
        </Route>
      </Route>

      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<div>errrrroooor</div>} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
