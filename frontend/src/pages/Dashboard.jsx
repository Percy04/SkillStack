import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Header from "../components/Header";

function Dashboard() {
  return (
    <div>
      <Header></Header>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
