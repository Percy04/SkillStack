import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Header from "../components/Header";

function Dashboard() {
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
        <Header></Header>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
