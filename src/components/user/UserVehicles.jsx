import { useNavigate, useOutletContext } from "react-router-dom";

const UserVehicles = () => {
  const [vehicles] = useOutletContext();

  const navigate = useNavigate();
  return (
    <div className="dashboard-second-child">
      {vehicles.length > 0 ? (
        <>
          <h1>Available vehicles to rent</h1>
          <div className="grid-container">
            {vehicles.map((element) => {
              return (
                <div key={element._id} className="my-card">
                  <img
                    className="card-img-top"
                    alt="Card image cap"
                    src={element.vehicleImage}
                  />
                  <div className="card-text-div">
                    <h3>{element.manufacturer + " " + element.model}</h3>

                    <h6>{element.registrationNo}</h6>
                    <h6>{element.features}</h6>
                    <h6>{element.isElectricVehicle ? "EV" : "non-EV"}</h6>
                    <h6>{"Rental : ₹" + element.rentalPricePerDay + "/day"}</h6>
                    <h6>{"Capacity : " + element.capacity}</h6>
                    <h6>{"Year - " + element.year}</h6>
                    <button
                      onClick={() => navigate("/rentVehicle/" + element._id)}
                      className="btn btn-primary m-2"
                    >
                      Rent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h3>Sorry no vehicles available.</h3>
      )}
    </div>
  );
};

export default UserVehicles;
