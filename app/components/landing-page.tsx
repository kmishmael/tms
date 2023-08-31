import React from "react";
import { BsTicket } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { LiaHistorySolid } from "react-icons/lia";
import Loader from "./loader";
import { auth, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Footer from "./footer";
import Image from "next/image";
import Team from "./team";
import { FAQ } from "./faq";

const Landing: React.FC = () => {
  const { userId, user } = auth();

  return (
    <main>
      <div className="min-h-screen">
        <nav className="w-full flex px-16 items-center border-b h-16 justify-between">
          <div className="h-ful flex items-center">
            <img src="/logo-large.png" alt="Logo" className="h-10" />
          </div>

          <div className="flex gap-10 mr-10">
            <>
              <SignedOut>
                <Link href={"/sign-in"}>
                  <button className="text-white font-medium hover:bg-neutral-500 transition-colors py-2 px-3 rounded-md">
                    Sign in
                  </button>
                </Link>
                <Link href={"/sign-up"}>
                  <button className="text-white font-medium bg-blue-600 py-2 px-3 rounded-md hover:bg-blue-800">
                    Sign up
                  </button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href={"/dashboard"}>
                  <button className="text-white font-normal bg-blue-600 py-1.5 px-2 rounded-md hover:bg-blue-800">
                    Dashboard
                  </button>
                </Link>
              </SignedIn>
            </>
          </div>
        </nav>
        <div className="w-[95%] bg-white mx-auto p-4">
          {/* <p className="text-md font-medium uppercase">Support Center</p> */}

          <p className="text-4xl mt-5 font-normal text-sentinel-pr">
            Hello{" "}
            <span className="text-4xl font-medium italic text-sentinel-se">
              Dear Sentinel{" "}
            </span>
            . Welcome to the IT help desk!
          </p>

          <p className="mt-4 text-xl">
            Get help with technical issues, report incidents, requests for
            elevated access or withdrawal of access and connect with your IT
            support team.
          </p>
          <br />
          <div className="flex justify-between w-full mt-6">
            <Link
              href={"/tickets/create"}
              className="flex items-center gap-6 bg-sentinel-blue transition-all w-[30%] py-2 px-4 rounded-md hover:bg-blue-700 hover:-translate-y-1"
            >
              <BsTicket className="h-12 w-12 text-white mt-2" />
              <div className="text-gray-100 text-lg">
                <p>Submit a new ticket</p>
              </div>
            </Link>

            <Link
              href={"/dashboard"}
              className="flex items-center gap-6 bg-sentinel-blue w-[30%] py-2 px-4 rounded-md transition-all hover:bg-blue-700 hover:-translate-y-1"
            >
              <AiOutlineSearch className="h-12 w-12 text-white mt-2" />
              <div className="text-gray-100 text-lg">
                <p>View the status of your ticket</p>
              </div>
            </Link>

            <Link
              href={"/dashboard"}
              className="flex items-center gap-6 bg-sentinel-blue w-[30%] py-2 px-4 rounded-md transition-all hover:bg-blue-700 hover:-translate-y-1"
            >
              <LiaHistorySolid className="h-12 w-12 text-white mt-2" />
              <div className="text-gray-100 text-lg">
                <p>View your request history</p>
              </div>
            </Link>
          </div>

          <div className="relative w-full h-48 mt-10 rounded-lg overflow-hidden">
            <Image
              src={"/it-front.jpg"}
              height={200}
              width={500}
              alt="It Help Desk"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-10 bottom-8">
              <p className="font-medium text-white mb-1 bg-black bg-opacity-60 w-fit py-2 px-4 rounded-md">
                We are live!
              </p>
              <p className="py-2 px-4 rounded-md font-medium bg-sentinel-blue text-gray-100">
                Didn't get help! Click here to chat with IT Support
              </p>
            </div>
          </div>
          <div className="mt-10">
            <FAQ />
          </div>
          <div className="mt-10">
            <Team />
          </div>
        </div>
      </div>
      {/*
    <Footer /> */}
    </main>
  );
};

export default Landing;
