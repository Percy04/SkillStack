import "../styles/components/header.css";
import React from "react";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <header className="header-container">
      <p id="skillstack">SkillStack</p>
      {/* <input type="search" name="search" id="search" /> */}
      <div className="search-bar">
        <SearchBar />
      </div>
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
