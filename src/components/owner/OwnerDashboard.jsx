import { useEffect, useState } from "react";
import { getCurrentUser, getJwt } from "../../services/authService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [owner, setOwner] = useState({ name: "OWNER" });
  const [vehicles, setVehicles] = useState();
  const [isLoadingOwnerDetails, setIsLoadingOwnerDetails] = useState(true);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [ownerDetails, setOwnerDetails] = useState();
  const [isLoadingRentals, setIsLoadingRentals] = useState(true);
  const [rentals, setRentals] = useState();
  const navigate = useNavigate();

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("/");
  }

  useEffect(() => {
    const owner = getCurrentUser();
    if (owner) setOwner(owner);

    const jwtToken = getJwt();
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

    axios
      .post("http://localhost:3000/owner/getOwner", owner, {
        headers: { Authorization: `${jwtToken}` },
      })
      .then((res) => {
        let { ownerDetails } = res.data;
        setOwnerDetails(ownerDetails);
        setIsLoadingOwnerDetails(false);
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
    axios
      .get("http://localhost:3000/general/rentals")
      .then((res) => {
        let rental = res.data.rentals;
        rental = rental.filter(
          (element) => element.owner._id === owner.ownerId
        );

        setRentals(rental);
        setIsLoadingRentals(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="mycontainer  text-center ">
          {!isLoadingOwnerDetails ? (
            <>
              <h1 className="mb-3">Hello 👋, {owner.name}</h1>

              {ownerDetails.address &&
              ownerDetails.identificationInfo &&
              ownerDetails.bankAccountDetails ? (
                ownerDetails.status === "pending" ? (
                  <>
                    <h1>Your account is under review!</h1>
                    <h3>It will be live soon</h3>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/addVehicle")}
                      className="btn btn-dark m-2"
                    >
                      Add a Vehicle
                    </button>
                    {isLoadingRentals ? (
                      <h3>Loading upcoming rentals..</h3>
                    ) : (
                      <>
                        <h3 className="mt-5 mb-3 ">
                          Upcoming rentals for your vehicles
                        </h3>
                        {rentals < 1 ? (
                          <h5>No upcoming rentals</h5>
                        ) : (
                          <div className="container">
                            <div className="row">
                              {rentals.map((element) => {
                                return (
                                  <div key={element._id} className="col-sm">
                                    <div
                                      key={element._id}
                                      className="card"
                                      style={{ width: "18rem" }}
                                    >
                                      <img
                                        className="card-img-top"
                                        alt="Card image cap"
                                        src={element.vehicle.vehicleImage}
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {element.vehicle.manufacturer +
                                            " " +
                                            element.vehicle.model}
                                        </h5>
                                      </div>
                                      <div>
                                        <h6>
                                          {formatDate(
                                            element.rentalDates.start
                                          ) +
                                            " - " +
                                            formatDate(element.rentalDates.end)}
                                        </h6>
                                        <h6>
                                          Owner phone :{" "}
                                          {element.owner.contact.phone}
                                        </h6>
                                        <h6>
                                          City : {element.owner.address.city}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {isLoadingVehicles ? (
                      <h3>Loading vehicles...</h3>
                    ) : vehicles.length > 0 ? (
                      <div className="container mysimplecontainer">
                        <h3 className="mb-5 mb-3">Your vehicles</h3>
                        <div className="row">
                          {vehicles.map((element) => {
                            return (
                              <div key={element._id} className="col-sm">
                                <div
                                  key={element._id}
                                  className="card"
                                  style={{ width: "20rem" }}
                                >
                                  <img
                                    className="card-img-top image-container"
                                    alt="Card image cap"
                                    src={element.vehicleImage}
                                  />
                                  <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                      <h5>
                                        {element.manufacturer +
                                          " " +
                                          element.model}
                                      </h5>
                                    </li>
                                    <li className="list-group-item">
                                      {element.status === "pending"
                                        ? "🟡 " + element.status
                                        : "🟢 " + element.status}
                                    </li>
                                    <li className="list-group-item">
                                      {element.registrationNo}
                                    </li>
                                    <li className="list-group-item">
                                      {element.features}
                                    </li>
                                    <li className="list-group-item">
                                      {element.isElectricVehicle
                                        ? "EV"
                                        : "non-EV"}
                                    </li>
                                    <li className="list-group-item">
                                      {"Rental : ₹" +
                                        element.rentalPricePerDay +
                                        "/day"}
                                    </li>
                                    <li className="list-group-item">
                                      {"Capacity : " + element.capacity}
                                    </li>
                                    <li className="list-group-item">
                                      {"Year - " + element.year}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <h3 className="mt-5">You didn't add any vehicle.</h3>
                    )}
                  </>
                )
              ) : (
                <>
                  <h3>Complete your profile to add vehicle</h3>
                  {ownerDetails.identificationInfo ? (
                    <></>
                  ) : (
                    <button
                      onClick={() => navigate("/uploadDocs")}
                      className="btn btn-dark m-2"
                    >
                      Upload Your docs
                    </button>
                  )}
                  {ownerDetails.bankAccountDetails ? (
                    <></>
                  ) : (
                    <button
                      onClick={() => navigate("/addBank")}
                      className="btn btn-dark m-2"
                    >
                      Add bank details
                    </button>
                  )}
                  {ownerDetails.address ? (
                    <></>
                  ) : (
                    <button
                      onClick={() => navigate("/addAddress")}
                      className="btn btn-dark m-2"
                    >
                      Add Address
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
