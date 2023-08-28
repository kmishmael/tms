import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import { BrowserRouter as Router, Route  } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import Home from "./routes/home.tsx";
import Navbar from "./components/navbar.tsx";
import Sidebar from "./components/sidebar.tsx";
//import Dashboard from "./components/create-dashboard.tsx";
import CreateTicket from "./components/create-ticket.tsx";
import ManageUsers from "./components/manage-users.tsx";
import CreateUser from "./components/create-user.tsx";
import ManageProjects from "./components/manage-project.tsx";
import EditTicket from "./components/edit-ticket.tsx";
import Dashboard from "./components/create-dashboard.tsx";
import App from "./App.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Dashboard />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/tickets/create",
//     element: <CreateTicket />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/manage-users",
//     element: <ManageUsers />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/users/create",
//     element: <CreateUser />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/manage-projects",
//     element: <ManageProjects />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/edit/:id",
//     element: <EditTicket />,
//     errorElement: <ErrorPage />,
//   }
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
