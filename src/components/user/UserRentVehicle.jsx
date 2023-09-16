import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";
import { toast } from "react-toastify";
import { getJwt } from "../../services/authService";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../../styles/dialogbox-styles.css";

const UserRentVehicle = () => {
  const [vehicle, setVehicle] = useState();
  const [rentals, setRentals] = useState();

  const params = useParams();
  const navigate = useNavigate();
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isLoadingRentals, setIsLoadingRentals] = useState(true);

  const [starting, setStarting] = useState(new Date());
  const [ending, setEnding] = useState(new Date());

  const sendAllRentalDates = () => {
    let rentalDates = [];
    rentals.forEach((e) =>
      rentalDates.push({
        start: new Date(e.rentalDates.start),
        end: new Date(e.rentalDates.end),
      })
    );
    return rentalDates;
  };

  const saveToDB = () => {
    const jwtToken = getJwt();
    console.log(starting);
    const rentalDate = {
      vehicleId: params.vehicleId,
      start: starting,
      end: ending,
    };
    console.log(rentalDate);
    axios
      .post("http://localhost:3000/user/rentVehicle", rentalDate, {
        headers: { Authorization: `${jwtToken}` },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Rented successfully");
        navigate("/user/dashboard/rentals");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function getDatesLength() {
    const timeDifference = ending - starting;
    return timeDifference / (1000 * 60 * 60 * 24) + 1;
  }

  useEffect(() => {
    axios
      .post("http://localhost:3000/general/getvehicle", {
        vehicleId: params.vehicleId,
      })
      .then((res) => {
        setVehicle(res.data.vehicle);
        setIsLoadingVehicles(false);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/general/rentals")
      .then((res) => {
        const vehicleId = params.vehicleId;
        let rental = res.data.rentals.filter(
          (element) => element.vehicle._id == vehicleId
        );
        setRentals(rental);
        setIsLoadingRentals(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="dialogbox_window">
      {isLoadingVehicles ? (
        <h3>Loading..</h3>
      ) : isLoadingRentals ? (
        <></>
      ) : (
        <div className="dialogbox_wrapper">
          <img
            className="header_image"
            src={vehicle.vehicleImage}
            alt="Card image cap"
          />
          <div className="dialogbox_content">
            <h2>{vehicle.manufacturer + " " + vehicle.model}</h2>
            <p>{"Rental : ₹" + vehicle.rentalPricePerDay + "/day"}</p>
            <p>Select Dates :</p>
            <div className="datepicker_wrapper">
              <DatePicker
                selected={starting}
                startDate={starting}
                endDate={ending}
                onChange={(date) => setStarting(new Date(date))}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 5)}
                excludeDateIntervals={sendAllRentalDates()}
                selectsStart
              />
              <DatePicker
                selected={ending}
                startDate={starting}
                endDate={ending}
                onChange={(date) => setEnding(new Date(date))}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 5)}
                excludeDateIntervals={sendAllRentalDates()}
                selectsEnd
              />
            </div>

            <button
              className="btn-primary"
              onClick={() => {
                const days = getDatesLength();
                const totalSum = days * Number(vehicle.rentalPricePerDay);

                confirmAlert({
                  title: "Confirm Rental",
                  message: `Your total amount for ${days} days is ₹${totalSum} `,
                  buttons: [
                    {
                      label: "Proceed to Pay",
                      onClick: () => saveToDB(),
                    },
                    {
                      label: "No",
                    },
                  ],
                });
              }}
            >
              Rent
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRentVehicle;
