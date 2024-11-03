import React from "react";
import logo from '../../public/logo.jpg'

function Logo({ width = "100px" }) {
  return (
    <div>
      <img
        src={logo}
        width={width}
        alt="Logo"
      ></img>
    </div>
  );
}

export default Logo;
