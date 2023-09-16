import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveJwt } from "../../services/authService";

const OwnerLogin = () => {
  const navigate = useNavigate();
  const [ownerLogin, setOwnerLogin] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/owner/login", ownerLogin)
      .then((res) => {
        toast.success("Login successful");
        saveJwt(res.data.token);
        navigate("/owner/dashboard/home");
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="form-parent-window">
      <form onSubmit={handleSubmit}>
        <h1>Owner Login</h1>
        <div className="input-div">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={(event) => {
              setOwnerLogin({ ...ownerLogin, email: event.target.value });
            }}
            type="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="input-div">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={(event) => {
              setOwnerLogin({
                ...ownerLogin,
                password: event.target.value,
              });
            }}
            type="password"
            id="exampleInputPassword1"
            required
          />
        </div>

        <div className="input-div">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default OwnerLogin;
