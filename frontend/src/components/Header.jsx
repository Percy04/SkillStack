import "../styles/components/header.css";
import React from "react";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="header-container">
      <p id="skillstack">SkillStack</p>
      {/* <input type="search" name="search" id="search" /> */}
      <SearchBar />
      <p>Master</p>
      <p>My skills</p>
      <a href="www.youtube.com">
        <img src="../../public/wishlist.png" alt="wishlist" />
      </a>
      <a href="www.youtube.com">
        <img src="../../public/shopping-cart.png" alt="wishlist" />
      </a>
      <a href="www.youtube.com">
        <img src="../../public/notification.png" alt="wishlist" />
      </a>
      <p id="user-icon">S</p>
    </header>
  );
}

export default Header;
