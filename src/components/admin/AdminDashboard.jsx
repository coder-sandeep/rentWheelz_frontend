import { Outlet, useNavigate } from "react-router-dom";
import { AdminSideBarData } from "./AdminSideBarData";
import SideBar from "./../common/SideBar";
import "../../styles/dashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-parent">
      <SideBar data={AdminSideBarData} />
      <div className="dashboard-secondChild">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

/*<h1>Hello 👋 Admin!</h1>
      <br />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {ownerRequests[0] ? (
            <>
              <h1>Pending Owner requests</h1>
              {ownerRequests.forEach((element) => {
                ownerList.push(
                  <div
                    key={element.contact.email}
                    className="mb-4 p-4 border border-secondary rounded"
                  >
                    <img
                      className="image-container"
                      src={
                        element.profileImage
                          ? element.profileImage
                          : profile_sub
                      }
                    />

                    <p>Name : {element.name}</p>
                    <p>Phone : {element.contact.phone}</p>
                    <p>Email : {element.contact.email}</p>
                    <p>Phone Number : {element.contact.phone}</p>
                    <p>
                      Full Address :
                      {element.address
                        ? element.address.houseNo +
                          "," +
                          element.address.locality +
                          " " +
                          element.address.city +
                          "-" +
                          element.address.pinCode +
                          " , " +
                          element.address.state +
                          " " +
                          element.address.country
                        : "NA"}
                    </p>
                    <div>
                      <h6>Bank Details :</h6>
                      {element.bankAccountDetails
                        ? " Bank Name : " +
                          element.bankAccountDetails.bankName +
                          " Account No : " +
                          element.bankAccountDetails.accountNo +
                          " ISFC : " +
                          element.bankAccountDetails.ifscCode +
                          " Mobile No : " +
                          element.bankAccountDetails.linkedMobileNo
                        : "NA"}
                      <h6>Identification : </h6>
                      {element.identificationInfo ? (
                        <>
                          <h3>
                            Aadhar No :{element.identificationInfo.aadhaarNo}
                          </h3>
                          <h6>Aadhar Front</h6>
                          <img
                            className="image-container-horizontal"
                            src={element.identificationInfo.aadhaarImage.front}
                          />
                          <h6>Aadhar Back</h6>
                          <img
                            className="image-container-horizontal"
                            src={element.identificationInfo.aadhaarImage.back}
                          />
                          <h3>PAN No :{element.identificationInfo.panNo}</h3>
                          <h6>PAN Front</h6>
                          <img
                            className="image-container-horizontal"
                            src={element.identificationInfo.panImage.front}
                          />

                          <h6>PAN Back</h6>
                          <img
                            className="image-container-horizontal"
                            src={element.identificationInfo.panImage.back}
                          />
                        </>
                      ) : (
                        "NA"
                      )}
                      <div className="mt-3">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => {
                            const jwtToken = getJwt();
                            axios
                              .post(
                                "http://localhost:3000/admin/approveOwnerRequest",
                                { ownerRequestId: element._id },
                                {
                                  headers: { Authorization: `${jwtToken}` },
                                }
                              )
                              .then(function (response) {
                                toast.success("Rented successfully");
                                setTimeout(() => navigate(0), 2000);
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          }}
                        >
                          Approve accoun
                        </button>
                      </div>
                      <div className="mt-3">
                        <button type="submit" className="btn btn-secondary">
                          Reject account
                        </button>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
              {ownerList}
            </>
          ) : (
            <h3>No Pending Owner Requests</h3>
          )}
        </>
      )}
      <br />
      {isLoadingVehicles ? (
        <h1>Loading...</h1>
      ) : vehicles.length > 0 ? (
        <>
          <h1>Vehicle Requests</h1>

          {vehicles.map((element) => {
            return (
              <div className="col-sm">
                <div
                  key={element._id}
                  className="card"
                  style={{ width: "18rem" }}
                >
                  <img
                    className="card-img-top image-container"
                    alt="Card image cap"
                    src={element.vehicleImage}
                  />
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <h5>{element.manufacturer + " " + element.model}</h5>
                    </li>
                    <li className="list-group-item">
                      {element.registrationNo}
                    </li>
                    <li className="list-group-item">{element.features}</li>
                    <li className="list-group-item">
                      {element.isElectricVehicle ? "EV" : "non-EV"}
                    </li>
                    <li className="list-group-item">
                      {"Rental : ₹" + element.rentalPricePerDay + "/day"}
                    </li>
                    <li className="list-group-item">
                      {"Capacity : " + element.capacity}
                    </li>
                    <li className="list-group-item">
                      {"Year - " + element.year}
                    </li>
                  </ul>
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
                          setTimeout(() => navigate(0), 2000);
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    }}
                    className="btn btn-primary m-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => console.log("rejected")}
                    className="btn btn-danger m-2"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <h3>No Pending Vehicle requests</h3>
      )}*/
