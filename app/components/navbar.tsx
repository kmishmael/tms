'use client'

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";


import { UserButton } from "@clerk/nextjs";
import Loader from "./loader";


const Navbar = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <nav className="flex border h-14 items-center justify-end navbar-light ml-auto">
      <div
        className="h-8 flex items-center sm:ml-8 md:ml-16"
        style={{ height: "60px" }}
      >
        <Link href={'/'}>
        <img src={'/logo-large.png'} className="h-8" alt="logo" />
        </Link>
      </div>
      <div className="flex gap-6 items-center h-full ml-8 text-gray-500 text-normal">
        <Link style={{textDecoration: 'none'}} href={'#'} className="my-auto text-gray-500 font-medium hover:text-gray-800">Dashboard</Link>
        <Link style={{textDecoration: 'none'}} href={'#'} className="my-auto text-gray-500 font-medium hover:text-gray-800">Tickets</Link>
        <Link style={{textDecoration: 'none'}} href={'#'} className="my-auto text-gray-500 font-medium hover:text-gray-800">Articles</Link>
        <Link style={{textDecoration: 'none'}} href={'#'} className="my-auto text-gray-500 font-medium hover:text-gray-800">FAQs</Link>
      </div>
      <div className="ml-auto mr-16">

        {isLoaded ? (
          <>
        {userId ? (
          <>
            <UserButton />
          </>
        ) : (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li>
                <Link href="/sign-in" className="nav-link">
                  Log In
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="nav-link">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        )}
        </>
        )
        :
        (
          <>
          <Loader />
          </>
        )
}
      </div>
    </nav>
  );
};

export default Navbar;
