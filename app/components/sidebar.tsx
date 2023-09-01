
import React from "react";
import { NavLink } from "react-router-dom";


interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">


      <ul className="nav flex-column mt-10">
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active nav-link" : " nav-link"
            }
          >
            <i className="fas fa-home"></i>
            Dashboard Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tickets/create"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active nav-link" : " nav-link"
            }
          >
            <i className="fas fa-ticket-alt"></i>
            Submit a Ticket
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/manage-users"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active nav-link" : " nav-link"
            }
          >
            <i className="fas fa-users"></i>
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/manage-projects"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active nav-link" : "nav-link"
            }
          >
            <i className="fas fa-folder"></i>
            Manage Projects
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
