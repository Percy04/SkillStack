import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Header from "../components/Header";

function Dashboard() {
  const navigate = useNavigate();

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/login/success", {
  //       withCredentials: true,
  //     });
  //   } catch (error) {
  //     navigate("*");
  //   }
  // };

  // const getUser = async() => {
  //   const token = localStorage.getItem("token");
  //   console.log("TOKEN: " + token);
  //   try {
  //     const response = await axios.get("http://localhost:5000/dashboard", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })

  //     console.log("RESPONSE: ", response.data);
  //     // window.open.href="http://localhost:5173/error";

  //   } catch (error) {
  //     console.log("error accessing protected route: ", error.response.data.message);
  //     // window.open.href="http://localhost:5173/error";
  //     navigate("*");
  //   }
  // }

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
