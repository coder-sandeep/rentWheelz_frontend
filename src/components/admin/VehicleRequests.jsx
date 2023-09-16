import axios from "axios";
import { useEffect, useState } from "react";
import { getJwt } from "../../services/authService";
import { toast } from "react-toastify";
import "../../styles/card-styles.css";
import { useNavigate } from "react-router-dom";

const VehicleRequests = () => {
  const [isLoadingVehicleRequests, setIsLoadingVehicleRequests] =
    useState(true);
  const [vehicleRequests, setVehicleRequests] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/general/getAllVehicles")
      .then((res) => {
        let { vehicles } = res.data;
        vehicles = vehicles.filter((element) => element.status == "pending");
        setVehicleRequests(vehicles);
        setIsLoadingVehicleRequests(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="dashboard-second-child">
      {isLoadingVehicleRequests ? (
        <div className="div-with-center-content">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <h1>Pending Owner requests</h1>
          {vehicleRequests[0] ? (
            <div className="grid-container">
              {vehicleRequests.map((element) => {
                return (
                  <div key={element._id} className="my-card">
                    <img alt="Card image cap" src={element.vehicleImage} />
                    <div className="card-text-div">
                      <div className="card-heading">
                        <h5>{element.manufacturer + " " + element.model}</h5>
                      </div>
                      <p>{element.registrationNo}</p>
                      <p>{element.features}</p>
                      <p>{element.isElectricVehicle ? "EV" : "non-EV"}</p>
                      <p>{"Rental : ₹" + element.rentalPricePerDay + "/day"}</p>
                      <p>{"Capacity : " + element.capacity}</p>
                      <p>{"Year - " + element.year}</p>

                      <button
                        onClick={() => {
                          const jwtToken = getJwt();
                          axios
                            .post(
                              "http://localhost:3000/admin/approveVehicleRequest",
                              { vehicleId: element._id },
                              {
                                headers: { Authorization: `${jwtToken}` },
                              }
                            )
                            .then(function (response) {
                              toast.success("Vehicle Approved");
                              console.log("done");
                              window.location.reload();
                            })
                            .catch(function (error) {
                              console.log(error);
                            });
                        }}
                      >
                        Approve
                      </button>
                      <button onClick={() => console.log("rejected")}>
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h3>Currently no Pending Owner Requests :</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleRequests;
