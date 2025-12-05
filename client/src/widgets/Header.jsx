import React from "react";
import Navbar from "./Navbar";

function Header({ logoutHandler }) {
  return (
    <header>
      <Navbar logoutHandler={logoutHandler} />
    </header>
  );
}

export default Header;
