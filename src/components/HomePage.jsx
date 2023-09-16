import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import NavBar from "./common/NavBar";

const HomaPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="container-center-content">
        <div>
          <p style={{ fontSize: "60px", "font-weight": "600" }}>
            Welcome to rentWheelz 🚗
          </p>
          <p style={{ fontSize: "20px" }}>
            Welcome to our cutting-edge vehicle rental platform, where adventure
            awaits you! Discover a vast selection of vehicles, from sleek cars
            to rugged bikes, and explore the world on your terms. Connect with
            passionate owners, experience seamless rentals, and join a vibrant
            community of automotive enthusiasts. Start your journey today and
            make memories that last a lifetime!
          </p>
          <button onClick={() => navigate("/userLogin")}>Start Renting</button>
        </div>
      </div>
    </>
  );
};

export default HomaPage;
