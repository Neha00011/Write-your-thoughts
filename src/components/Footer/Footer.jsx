import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="py-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -m-6">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; 2023 DevUI. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-7/12">
            <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/" className="text-gray-400 hover:text-white transition duration-200">
                Home
              </Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition duration-200">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition duration-200">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
