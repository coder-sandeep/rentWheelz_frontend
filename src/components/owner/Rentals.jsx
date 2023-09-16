import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";

import "../../styles/card-styles.css";
import axios from "axios";

const Rentals = () => {
  const [rentals, setRentals] = useState();
  const [isLoadingRentals, setIsLoadingRentals] = useState(true);

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
    <div className="dashboard-second-child">
      {isLoadingRentals ? (
        <h3>Loading upcoming rentals..</h3>
      ) : (
        <>
          <h1>Upcoming rentals for your vehicles</h1>
          {rentals < 1 ? (
            <h5>No upcoming rentals</h5>
          ) : (
            <div className="grid-container">
              {rentals.map((element) => {
                return (
                  <div key={element._id} className="my-card">
                    <div key={element._id}>
                      <img
                        alt="Card image cap"
                        src={element.vehicle.vehicleImage}
                      />
                      <div className="card-text-div">
                        <h3 className="card-heading">
                          {element.vehicle.manufacturer +
                            " " +
                            element.vehicle.model}
                        </h3>
                        <p>
                          {formatDate(element.rentalDates.start) +
                            " - " +
                            formatDate(element.rentalDates.end)}
                        </p>
                        <p>Owner phone : {element.owner.contact.phone}</p>
                        <p>City : {element.owner.address.city}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Rentals;
