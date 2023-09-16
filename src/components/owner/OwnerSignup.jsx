import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerSignup = () => {
  const navigate = useNavigate();
  const [ownerRequest, setOwnerRequest] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(ownerRequest);
    axios
      .post("http://localhost:3000/owner/register", ownerRequest)
      .then((res) => {
        toast.success("Signup successful");
        navigate("/ownerLogin");
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="form-parent-window">
      <form onSubmit={handleSubmit}>
        <h1>Owner Signup</h1>
        <div className="input-div">
          <label htmlFor="exampleInputName">Your Name</label>
          <input
            onChange={(event) => {
              setOwnerRequest({ ...ownerRequest, name: event.target.value });
            }}
            type="text"
            id="exampleInputName"
            required
          />
        </div>

        <div className="input-div">
          <label htmlFor="exampleInputPhone">Phone</label>
          <input
            onChange={(event) => {
              setOwnerRequest({ ...ownerRequest, phone: event.target.value });
            }}
            type="text"
            id="exampleInputPhone"
            required
          />
        </div>

        <div className="input-div">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={(event) => {
              setOwnerRequest({ ...ownerRequest, email: event.target.value });
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
              setOwnerRequest({
                ...ownerRequest,
                password: event.target.value,
              });
            }}
            type="password"
            id="exampleInputPassword1"
            required
          />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default OwnerSignup;
