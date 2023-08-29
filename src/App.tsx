import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/edit-ticket";
import CreateTicket from "./components/create-ticket";
import ManageUsers from "./components/manage-users";
import CreateUser from "./components/create-user";
import ManageProjects from "./components/manage-project";
import EditTicket from "./components/edit-ticket";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

export default function App() {

  return (
    <BrowserRouter>
      <ClerkProvider
        publishableKey={clerkPubKey}
        navigate={(to) => navigate(to)}
      >
        <Navbar />
        <div className="wrapper">
          <Sidebar />
          <div id="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/sign-in/*"
                element={<SignIn routing="path"  path="/sign-in" />}
              />
              <Route
                path="/sign-up/*"
                element={<SignUp routing="path" path="/sign-up" />}
              />
              <Route path="/tickets/create" element={<CreateTicket />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/manage-projects" element={<ManageProjects />} />
              <Route path="/edit/:id" element={<EditTicket />} />
            </Routes>
          </div>
        </div>
      </ClerkProvider>
    </BrowserRouter>
  );
}
