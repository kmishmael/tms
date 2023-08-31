import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-large.png";
import {
  ClerkProvider,
  SignedIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex border h-14 items-center justify-end navbar-light ml-auto">
      <div
        className="h-8 flex items-center sm:ml-8 md:ml-16"
        style={{ height: "60px" }}
      >
        <Link to={'/'}>
        <img src={logo} className="h-8" alt="logo" />
        </Link>
      </div>
      <div className="flex gap-6 items-center h-full ml-8 text-gray-500 text-normal">
        <Link style={{textDecoration: 'none'}} to={'#'} className="my-auto text-gray-500 font-medium hover:text-gray-800">Dashboard</Link>
        <Link style={{textDecoration: 'none'}} to={'#'} className="my-auto text-gray-500 font-medium hover:text-gray-800">Tickets</Link>
        <Link style={{textDecoration: 'none'}} to={'#'} className="my-auto text-gray-500 font-medium hover:text-gray-800">Articles</Link>
        <Link style={{textDecoration: 'none'}} to={'#'} className="my-auto text-gray-500 font-medium hover:text-gray-800">FAQs</Link>
      </div>
      <div className="ml-auto mr-16">
        {isSignedIn ? (
          <>
            <UserButton />
          </>
        ) : (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li>
                <Link to="/sign-in" className="nav-link">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="nav-link">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
