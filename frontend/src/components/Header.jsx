import "../styles/components/header.css";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Header() {
  const [userData, setUserData] = useState({});

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/login/success", {
  //       withCredentials: true,
  //     });
  //     // console.log("Response: ", response);
  //     setUserData(() => response.data.user);
  //   } catch (error) {
  //     console.log("Not logged in: ", error);
  //   }
  // };

  // useEffect(() => {
  //   // getUser();
  // }, []);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    console.log("TOKEN: " + token);
    try {
      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("RESPONSE: ", response.data);
      // console.log("USERDATA: ", Object.keys(userData));
      // window.open.href="http://localhost:5173/error";
    } catch (error) {
      console.log(
        "error accessing protected route: ",
        error.response.data.message
      );
      // window.open.href="http://localhost:5173/error";
      navigate("*");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    window.open("http://localhost:5000/logout", "_self");
  };

  // useEffect(() => {
  //   console.log("userData: ", userData);
  // }, [userData])

  return (
    <header className="header-container">
      <a href="#mainpage" id="skillstack">
        SkillStack
      </a>
      {/* <input type="search" name="search" id="search" /> */}
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="header-right">
        <a href="www.youtube.com">Master</a>
        {Object.keys(userData)?.length > 0 ? (
          <>
            <a id="myskills-text" href="www.youtube.com">
              My skills{" "}
            </a>
            <a id="logout-text" onClick={logout}>
              Logout
            </a>
            <a id="profile-text" >
              Hi
            </a>
          </>
        ) : (
          <div>Login</div>
        )}
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
