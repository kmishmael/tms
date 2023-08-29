import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="navbar flex justify-end navbar-light bg-light navbar-expand-lg ml-auto">
      <div className="ml-auto mr-16">
        {isSignedIn ? (
          <SignOutButton />
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
                  Sign Out
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
