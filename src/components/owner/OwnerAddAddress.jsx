import { useState } from "react";
import displayToast from "../../App";
import axios from "axios";
import { getJwt } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OwnerAddAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    houseNo: "",
    locality: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const jwtToken = getJwt();
    axios
      .post("http://localhost:3000/owner/addAddress", address, {
        headers: { Authorization: `${jwtToken}` },
      })
      .then((res) => {
        toast.success("Added Address successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/owner/dashboard");
      })
      .catch(function (error) {
        console.log(error);
        displayToast(true, error.response.data.message);
      });
  };
  return (
    <div className="form-parent-window">
      <form onSubmit={handleSubmit}>
        <h1>Add Address</h1>
        <div className="input-div">
          <label htmlFor="inputHouseNo">House No</label>
          <input
            type="text"
            onChange={(event) => {
              setAddress({ ...address, houseNo: event.target.value });
            }}
            id="inputHouseNo"
            required
          />
          <label htmlFor="inputLocality">Locality</label>
          <input
            type="text"
            onChange={(event) => {
              setAddress({ ...address, locality: event.target.value });
            }}
            id="inputLocality"
            required
          />
          <label htmlFor="inputCity">City</label>
          <input
            type="text"
            onChange={(event) => {
              setAddress({ ...address, city: event.target.value });
            }}
            id="inputCity"
            required
          />
          <label htmlFor="inputState">State/UT</label>
          <select
            onChange={(event) => {
              setAddress({ ...address, state: event.target.value });
            }}
          >
            <option>Default select</option>
            <option>Andaman and Nicobar Islands</option>
            <option>Andhra Pradesh</option>
            <option>Arunachal Pradesh</option>
            <option>Assam</option>
            <option>Bihar</option>
            <option>Chandigarh</option>
            <option>Chhattisgarh</option>
            <option>Dadra and Nagar Haveli</option>
            <option>Daman and Diu</option>
            <option>Delhi</option>
            <option>Goa</option>
            <option>Gujarat</option>
            <option>Haryana</option>
            <option>Himachal Pradesh</option>
            <option>Jammu</option>
            <option>Jharkhand</option>
            <option>Karnataka</option>
            <option>Kashmir</option>
            <option>Kerala</option>
            <option>Ladakh</option>
            <option>Lakshadweep</option>
            <option>Madhya Pradesh</option>
            <option>Maharashtra</option>
            <option>Manipur</option>
            <option>Meghalaya</option>
            <option>Mizoram</option>
            <option>Nagaland</option>
            <option>Odisha</option>
            <option>Puducherry</option>
            <option>Punjab</option>
            <option>Rajasthan</option>
            <option>Sikkim</option>
            <option>Tamil Nadu</option>
            <option>Telangana</option>
            <option>Tripura</option>
            <option>Uttarakhand</option>
            <option>Uttar Pradesh</option>
            <option>West Bengal</option>
          </select>
          <label htmlFor="inputPin">Pin Code</label>
          <input
            onChange={(event) => {
              setAddress({ ...address, pinCode: event.target.value });
            }}
            type="text"
            id="inputPin"
            required
          />
          <label htmlFor="inputCountry">Country</label>
          <input
            type="text"
            onChange={(event) => {
              setAddress({ ...address, country: event.target.value });
            }}
            id="inputCountry"
            required
          />
          <button type="submit" className="btn btn-primary">
            Add Your Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerAddAddress;
