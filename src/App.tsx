import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "./components/edit-ticket";
import CreateTicket from "./components/create-ticket";
import ManageUsers from "./components/manage-users";
import CreateUser from "./components/create-user";
import ManageProjects from "./components/manage-project";
import EditTicket from "./components/edit-ticket";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import Layout from "./components/layout";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />

        <Route
          path="/tickets/create"
          element={
            <Layout>
              <CreateTicket />
            </Layout>
          }
        />
        <Route
          path="/manage-users"
          element={
            <Layout>
              <ManageUsers />
            </Layout>
          }
        />
        <Route
          path="/users/create"
          element={
            <Layout>
              <CreateUser />
            </Layout>
          }
        />
        <Route
          path="/manage-projects"
          element={
            <Layout>
              <ManageProjects />
            </Layout>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Layout>
              <EditTicket />
            </Layout>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}
