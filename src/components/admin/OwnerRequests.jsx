import { useNavigate, useOutletContext } from "react-router-dom";
import { getJwt } from "../../services/authService";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const OwnerRequests = () => {
  const ownerList = [];
  const [ownerRequests, setOwnerRequests] = useState();
  const [isLoadingOwnerRequests, setIsLoadingOwnerRequests] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/getOwnerRequests")
      .then(function (response) {
        let ownersList = response.data;
        ownersList = ownersList.filter(
          (element) => element.status == "pending"
        );
        setOwnerRequests(ownersList);
        setIsLoadingOwnerRequests(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="dashboard-second-child">
      {isLoadingOwnerRequests ? (
        <div className="div-with-center-content">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <h1>Pending Owner requests</h1>
          {ownerRequests[0] ? (
            <div className="grid-container">
              {ownerRequests.forEach((element) => {
                ownerList.push(
                  <div key={element.contact.email} className="my-card">
                    <img
                      className="image-container"
                      src={
                        element.profileImage
                          ? element.profileImage
                          : profile_sub
                      }
                    />
                    <div className="card-text-div">
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
                              src={
                                element.identificationInfo.aadhaarImage.front
                              }
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
                                toast.success("Approved account");
                                navigate("admin/dashboard/owner-requests");
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          }}
                        >
                          Approve account
                        </button>
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
            </div>
          ) : (
            <div>
              <h3>Currently no Pending Owner Requests ❌</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerRequests;
