import "../styles/components/header.css";
import React from "react";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <header className="header-container">
      <a href="#mainpage" id="skillstack">SkillStack</a>
      {/* <input type="search" name="search" id="search" /> */}
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="header-right">
        <a href="www.youtube.com">Master</a>
        <a id="myskills-text" href="www.youtube.com">My skills </a>
        <a href="www.youtube.com">
          <img src="../../public/wishlist.png" alt="wishlist" />
        </a>
        <a href="www.youtube.com">
          <img src="../../public/shopping-cart.png" alt="wishlist" />
        </a>
        <a href="www.youtube.com">
          <img src="../../public/notification.png" alt="wishlist" />
        </a>
        <a href="www.youtube.com" id="user-icon">S</a>
      </div>
    </header>
  );
}

export default Header;
