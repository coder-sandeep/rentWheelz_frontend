import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveJwt } from "../../services/authService";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminLogin, setAdminLogin] = useState();

  const handleSubmit = (event) => {
    console.log(adminLogin);
    event.preventDefault();
    axios
      .post("http://localhost:3000/admin/login", adminLogin)
      .then((res) => {
        saveJwt(res.data.token);
        toast.success("Login successful");
        navigate("/admin/dashboard/home");
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="form-parent-window">
      <form onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <div className="input-div">
          <label htmlFor="inputTitle" className="form-label">
            Title
          </label>
          <input
            onChange={(event) => {
              setAdminLogin({ ...adminLogin, title: event.target.value });
            }}
            type="text"
            className="form-control"
            id="inputTitle"
            required
          />
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={(event) => {
              setAdminLogin({
                ...adminLogin,
                password: event.target.value,
              });
            }}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <div className="input-div">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
