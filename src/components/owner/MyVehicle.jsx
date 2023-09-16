import axios from "axios";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const MyVehicle = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState();
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);

  useEffect(() => {
    const owner = getCurrentUser();

    axios
      .get("http://localhost:3000/general/getAllVehicles")
      .then((res) => {
        let { vehicles } = res.data;
        vehicles = vehicles.filter(
          (element) => element.ownerId === owner.ownerId
        );
        setVehicles(vehicles);
        setIsLoadingVehicles(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="dashboard-second-child">
      {isLoadingVehicles ? (
        <h3>Loading vehicles...</h3>
      ) : vehicles.length > 0 ? (
        <>
          <div className="your-vehicle-heading-div">
            <h1>Your vehicles</h1>
            <button
              onClick={() => navigate("/addVehicle")}
              className="btn btn-dark m-2"
            >
              Add a Vehicle
            </button>
          </div>

          <div className="grid-container">
            {vehicles.map((element) => {
              return (
                <div key={element._id} className="my-card">
                  <div key={element._id}>
                    <img alt="Card image cap" src={element.vehicleImage} />
                    <div className="card-text-div">
                      <h3 className="card-heading">
                        {element.manufacturer + " " + element.model}
                      </h3>
                      <p>
                        {element.status === "pending"
                          ? "🟡 " + element.status
                          : "🟢 " + element.status}
                      </p>
                      <p>{element.registrationNo}</p>
                      <p>{element.features}</p>
                      <p>{element.isElectricVehicle ? "EV" : "non-EV"}</p>
                      <p>{"Rental : ₹" + element.rentalPricePerDay + "/day"}</p>
                      <p>{"Capacity : " + element.capacity}</p>
                      <p>{"Year - " + element.year}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="your-vehicle-heading-div">
          <h1>You didn't add any vehicle</h1>
          <button
            onClick={() => navigate("/addVehicle")}
            className="btn btn-dark m-2"
          >
            Add a Vehicle
          </button>
        </div>
      )}
    </div>
  );
};

export default MyVehicle;
