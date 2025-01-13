import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/components/searchbar.css";
import { useEffect } from "react";

// function SearchBar() {
//   return(
//         <div className="dropdown">
//           <button>All</button>
//           <div className="content">
//             <a href="#">Apple</a>
//             <a href="#">Orange</a>
//             <a href="#">Apple</a>
//           </div>
//         </div>
//   );
// }

// function SearchBar() {
//   return (
//     <div>
//       <div className="input-group flex-grow-1">
//         <div className="input-group-btn search-panel">
//           <button className="btn" type="button">
//             <i className="bi bi-search"></i>
//           </button>
//         </div>
//         <input
//           type="hidden"
//           name="search_param"
//           value="all"
//           id="search_param"
//         />
//         <input
//           type="text"
//           className="form-control"
//           name="x"
//           id="search"
//           placeholder="Search"
//         />
//        </div>

//         <div className="dropdown">
//           <button>All</button>
//           <div className="content">
//             <a href="#">Apple</a>
//             <a href="#">Orange</a>
//             <a href="#">Apple</a>
//           </div>
//         </div>
//      </div>
//    );
//  }

function SearchBar() {
  return (
    <div className="search-bar">
      <div className="dropdown search-panel">
        <button
          className="btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
        >
          All
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Apple
          </a>
          <a className="dropdown-item" href="#">
            Orange
          </a>
          <a className="dropdown-item" href="#">
            Banana
          </a>
        </div>
      </div>
      <div className="input-group flex-grow-1">
        <input
          type="text"
          // className="form-control"
          className="input-form"
          name="search"
          id="search"
          placeholder="Search"
        />
        <button className="btn search-btn" type="button">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
