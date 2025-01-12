import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/components/searchbar.css";
import { useEffect } from "react";

function SearchBar() {

  return (
    <div>
      <div className="input-group flex-grow-1">
        <div className="input-group-btn search-panel">
          <button className="btn" type="button">
            <i className="bi bi-search"></i>
          </button>
          <ul className="dropdown-menu scrollable-dropdown" role="menu">
            <li>
              <a href="#">Automotive Accessories</a>
            </li>
            <li>
              <a href="#">Cell Phone Accessories</a>
            </li>
            <li>
              <a href="#">Computer Accessories</a>
            </li>
            <li>
              <a href="#">Health and Personal Care</a>
            </li>
          </ul>
        </div>
        <input
          type="hidden"
          name="search_param"
          value="all"
          id="search_param"
        />
        <input
          type="text"
          className="form-control"
          name="x"
          id="search"
          placeholder="Search"
        />
        <button
          type="button"
          className="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="caret"></span>
          <span id="search_concept">All</span>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
