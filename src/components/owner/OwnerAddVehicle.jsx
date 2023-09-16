import { useState } from "react";
import { getJwt } from "../../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OwnerAddVehicle = () => {
  const navigate = useNavigate();

  const [vehicleImage, setVehicleImage] = useState();
  const [vehicleRequest, setVehicleRequest] = useState({
    manufacturer: "",
    model: "2020",
    year: 0,
    category: "two-wheeler",
    isElectricVehicle: "true",
    registrationNo: "",
    rentalPricePerDay: 0,
    city: "",
    features: "",
    capacity: 0,
    age: 0,
  });

  function handleSubmit(event) {
    const jwtToken = getJwt();
    event.preventDefault();
    console.log(vehicleRequest);

    axios
      .post(
        "http://localhost:3000/owner/addNewVehicleRequest",
        vehicleRequest,
        {
          headers: { Authorization: `${jwtToken}` },
        }
      )
      .then((res) => {
        const formData = new FormData();
        formData.append("vehicle_image1", vehicleImage);

        console.log(vehicleImage);
        formData.append("vehicleId", res.data.result._id);
        const id = toast.loading("Uploading vehicle...");
        axios
          .post("http://localhost:3000/owner/vehicle/addImages", formData, {
            headers: { Authorization: `${jwtToken}` },
          })
          .then((response) => {
            console.log(response.data);
            toast.update(id, {
              render: "Uploading done",
              type: "success",
              isLoading: false,
            });
            setTimeout(() => {
              navigate("/owner/dashboard");
              toast.dismiss();
            }, 3000);
          });
      })
      .catch(function (error) {
        console.log(error);
        displayToast(true, error.response.data.message);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleRequest((prevData) => ({
      ...vehicleRequest,
      [name]: value,
    }));
  };

  return (
    <div className="form-parent-window">
      <form onSubmit={handleSubmit}>
        <h1>Add Vehicle</h1>
        <div className="input-div">
          <div className="input-groups-wrapper">
            <div className="input-wrapper">
              <label htmlFor="inputManufacturer">Manufacturer</label>
              <input
                type="text"
                id="inputManufacturer"
                name="manufacturer"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="inputModel">Model</label>
              <input
                type="text"
                onChange={handleChange}
                name="model"
                id="inputModel"
                required
              />
            </div>
          </div>

          <div className="radioinput_wrapper">
            <input
              type="radio"
              name="category"
              id="flexRadioDefault1"
              value="two-wheeler"
              onChange={handleChange}
            />
            <label htmlFor="flexRadioDefault1">2-wheeler</label>
            <input
              type="radio"
              name="category"
              id="flexRadioDefault2"
              value="four-wheeler"
              defaultChecked
              onChange={handleChange}
            />
            <label htmlFor="flexRadioDefault2">4-wheeler</label>
          </div>

          <div className="radioinput_wrapper">
            <input
              type="radio"
              name="isElectricVehicle"
              id="flexRadioDefault2"
              value="true"
              defaultChecked
              onChange={handleChange}
            />
            <label htmlFor="flexRadioDefault2">EV</label>
            <input
              className="form-check-input"
              type="radio"
              name="isElectricVehicle"
              id="flexRadioDefault1"
              value="false"
              onChange={handleChange}
            />
            <label htmlFor="flexRadioDefault1">non-EV</label>
          </div>

          <label htmlFor="inputRegNo">Registration No.</label>
          <input
            type="text"
            id="inputRegNo"
            required
            name="registrationNo"
            onChange={handleChange}
          />

          <label htmlFor="inputRent">Rental per day</label>
          <input
            type="text"
            id="inputRent"
            required
            name="rentalPricePerDay"
            onChange={handleChange}
          />

          <select id="inputcity" name="city" onChange={handleChange}>
            <option value={""}>Select City</option>
            <option value="Agra">Agra</option>
            <option value="Ahemdabad">Ahemdabad</option>
            <option value="Allepey">Allepey</option>
            <option value="Amritsar">Amritsar</option>
            <option value="Andamar Nicobar">Amritsar</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Bankok">Bankok</option>
            <option value="Belagavi">Belagavi</option>
            <option value="Bhubaneshwar">Bhubaneshwar</option>
            <option value="Bhuj">Bhuj</option>
            <option value="Calicut">Calicut</option>
            <option value="Coorg">Coorg</option>
            <option value="Devanagere">Devanagere</option>
            <option value="Delhi">Delhi</option>
            <option value="Dharmshala">Dharmshala</option>
            <option value="Gandhinagar">Gandhinagar</option>
            <option value="Goa">Goa</option>
            <option value="Gurugram">Gurugram</option>
            <option value="Guwahati">Guwahati</option>
            <option value="Hubli">Hubli</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Indore">Indore</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Jaisalmer">Jaisalmer</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Konark">Konark</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Manali">Manali</option>
            <option value="Manali">Manali</option>
            <option value="Mangalore">Mangalore</option>
            <option value="Mohali">Mohali</option>
            <option value="Mount-Abu">Mount-Abu</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Mysore">Mysore</option>
            <option value="Nashik">Nashik</option>
            <option value="Ooty">Ooty</option>
            <option value="Pondicherry">Pondicherry</option>
            <option value="Pune">Pune</option>
            <option value="Puri">Puri</option>
            <option value="Ranchi">Ranchi</option>
            <option value="Rishikesh">Rishikesh</option>
            <option value="Sakleshpur">Sakleshpur</option>
            <option value="Siliguri">Siliguri</option>
            <option value="Srinagar">Srinagar</option>
            <option value="Surat">Surat</option>
            <option value="Tirupati">Tirupati</option>
            <option value="Trivandrum">Trivandrum</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Udupi">Udupi</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Vizag">Vizag</option>
            <option value="Wayanad">Wayanad</option>
          </select>

          <label htmlFor="inputFeatures">Comma seperated features</label>
          <input
            type="text"
            onChange={handleChange}
            id="inputFeatures"
            required
            name="features"
          />

          <div className="input-groups-wrapper-grid">
            <div className="input-wrapper">
              <select
                className="form-select form-select"
                aria-label=".form-select-sm example"
                name="capacity"
                onChange={handleChange}
              >
                <option value={""}>Capacity</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>

            <div className="input-wrapper">
              <select
                aria-label=".form-select-sm example"
                name="age"
                onChange={handleChange}
              >
                <option value={""}> Age</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
              </select>
            </div>
            <div className="input-wrapper">
              <select name="year" onChange={handleChange}>
                <option value={""}>Release Year</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>

          <label htmlFor="vehicleImages">Vehicle Image</label>
          <input
            type="file"
            id="vehicleImages"
            name="vehicleImages"
            onChange={(e) => {
              setVehicleImage(e.target.files[0]);
            }}
          />

          <button type="submit" className="btn btn-primary">
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerAddVehicle;
