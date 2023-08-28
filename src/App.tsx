import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/edit-ticket";
import CreateTicket from "./components/create-ticket";
import ManageUsers from "./components/manage-users";
import CreateUser from "./components/create-user";
import ManageProjects from "./components/manage-project";
import EditTicket from "./components/edit-ticket";
import Home from "./routes/home";
//import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets/create" element={<CreateTicket />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/manage-projects" element={<ManageProjects />} />
            <Route path="/edit/:id" element={<EditTicket />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
