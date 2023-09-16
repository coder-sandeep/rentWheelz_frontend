import { useOutletContext } from "react-router-dom";

const UserRentals = () => {
  const [vehicles, rentals] = useOutletContext();
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("/");
  }

  return (
    <div className="dashboard-second-child">
      <>
        <h1>Your recent rentals</h1>
        {rentals < 1 ? (
          <h5>No vehicles rented</h5>
        ) : (
          <div className="grid-container">
            {rentals.map((element) => {
              return (
                <div key={element._id} className="my-card">
                  <img
                    alt="Card image cap"
                    src={element.vehicle.vehicleImage}
                  />
                  <div className="card-text-div">
                    <h3 style={{ marginBottom: "10px" }}>
                      {element.vehicle.manufacturer +
                        " " +
                        element.vehicle.model}
                    </h3>
                    <h6>
                      {formatDate(element.rentalDates.start) +
                        " - " +
                        formatDate(element.rentalDates.end)}
                    </h6>
                    <h6>Owner phone : {element.owner.contact.phone}</h6>
                    <h6>City : {element.owner.address.city}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default UserRentals;
