import { OwnerSideBarData } from "./OwnerSideBarData";
import SideBar from "./../common/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCurrentUser, getJwt } from "../../services/authService";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [owner, setOwner] = useState({ name: "OWNER" });
  const [ownerDetails, setOwnerDetails] = useState();
  const [isLoadingOwnerDetails, setIsLoadingOwnerDetails] = useState(true);

  useEffect(() => {
    const owner = getCurrentUser();
    if (owner) setOwner(owner);
    const jwtToken = getJwt();

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
        console.log(error);
      });
  }, []);

  return (
    <>
      {!isLoadingOwnerDetails ? (
        <div>
          {ownerDetails.address &&
          ownerDetails.identificationInfo &&
          ownerDetails.bankAccountDetails ? (
            ownerDetails.status === "pending" ? (
              <div className="div-with-center-content">
                <h1>✌️</h1>
                <h1>Your account is under review!</h1>
                <h3>It will be live soon</h3>
              </div>
            ) : (
              <div className="dashboard-parent">
                <SideBar data={OwnerSideBarData} />

                <div className="dashboard-secondChild">
                  <Outlet context={[owner, ownerDetails]} />
                </div>
              </div>
            )
          ) : (
            <div className="div-with-center-content">
              <h1>Hello 👋, {owner.name}</h1>
              <h3>Complete your profile to proceed further</h3>
              <div className="flex-row-div">
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
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Dashboard;
