import { UserSideBarData } from "./UserSideBarData";
import SideBar from "../common/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import "../../styles/dashboard.css";

const DashboardUser = () => {
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isLoadingRentals, setIsLoadingRentals] = useState(true);
  const [rentals, setRentals] = useState();
  const [vehicles, setVehicles] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/general/getAllVehicles")
      .then((res) => {
        let { vehicles } = res.data;
        vehicles = vehicles.filter((element) => element.status == "approved");
        setVehicles(vehicles);
        setIsLoadingVehicles(false);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/general/rentals")
      .then((res) => {
        let rental = res.data.rentals;
        rental.filter((element) => element.user._id === getCurrentUser());
        setRentals(rental);
        setIsLoadingRentals(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="dashboard-parent">
      <SideBar data={UserSideBarData} />
      <div className="dashboard-secondChild">
        {isLoadingRentals || isLoadingVehicles ? (
          <h1>Loading...</h1>
        ) : (
          <Outlet context={[vehicles, rentals]} />
        )}
      </div>
    </div>
  );
};

export default DashboardUser;
