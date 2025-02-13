import "../styles/components/header.css";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    let token = localStorage.getItem("token");
    // console.log("Token: " + token);
    if (!token) {
      // console.log("No token");
      //If Google sign in, then set token to localStorage
      try {
        const response = await axios.get(
          "http://localhost:5000/login/success",
          {
            withCredentials: true,
          }
        );
        // console.log("Response: ", response.data.token);
        localStorage.setItem("token", response.data.token);
        // setUserData(() => response.data.user);
      } catch (error) {
        console.log("Not logged in: ", error);
        return;
      }
      token = localStorage.getItem("token");
    }

    try {
      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("RESPONSE after token: ", response);

      setUserData(() => response.data.user);
    } catch (error) {
      console.log(
        "error accessing protected route: ",
        error.response.data.message
      );
      navigate("*");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.open("http://localhost:5000/logout", "_self");
  };

  return (
    <header className="header-container">
      <a href="" id="skillstack">
        SkillStack
      </a>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="header-right">
        <a href="http://localhost:5173/instructor/courses">Teacher</a>
        {Object.keys(userData)?.length > 0 ? (
          <>
            <a id="myskills-text" href="www.youtube.com">
              My skills
            </a>
            <a id="logout-text" onClick={logout}>
              Logout
            </a>
            <a id="profile-text">{userData.name}</a>
          </>
        ) : ""}
        <a href="www.youtube.com">
          <img src="../../public/wishlist.png" alt="wishlist" />
        </a>
        <a href="www.youtube.com">
          <img src="../../public/shopping-cart.png" alt="wishlist" />
        </a>
        <a href="www.youtube.com">
          <img src="../../public/notification.png" alt="wishlist" />
        </a>
        <a href="www.youtube.com" id="user-icon">
          S
        </a>
      </div>
    </header>
  );
}

export default Header;
