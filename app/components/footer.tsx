import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
      <div className="p-5">
        <ul>
          <p className="text-gray-800 font-bold text-3xl pb-6">
            Sentinel <span className="text-blue-600">Africa Consulting</span>
          </p>
          <div className="flex gap-6 pb-5">
            <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
            <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
            <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
            <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
          </div>
        </ul>
      </div>
      <div className="p-5">
        <ul>
          <p className="text-gray-800 font-bold text-2xl pb-4">Risk Analysis</p>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Cyber Threats
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Vulnerability Assessment
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Security Audits
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Incident Response
          </li>
        </ul>
      </div>
      <div className="p-5">
        <ul>
          <p className="text-gray-800 font-bold text-2xl pb-4">Company</p>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            About Us
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Services
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Cyber Solutions
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            News & Insights
          </li>
        </ul>
      </div>
      <div className="p-5">
        <ul>
          <p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Contact Us
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Client Portal
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Knowledge Base
          </li>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            Resources
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50">
        <p className="text-gray-800 font-semibold text-sm">
          © 2023 All rights reserved
        </p>
        <p className="hover:text-blue-600 font-semibold cursor-pointer">
          <span className="text-blue-600">Sentinel </span> Africa Consulting{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
