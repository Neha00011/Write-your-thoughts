import React from "react";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="py-10 flex flex-row gap-4 items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="mb-4 inline-flex items-center">
        <Logo width="50px" />
      </div>
      <div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
