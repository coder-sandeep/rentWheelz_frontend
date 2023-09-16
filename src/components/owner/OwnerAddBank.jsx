import { useState } from "react";
import displayToast from "../../App";
import axios from "axios";
import { getJwt } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OwnerAddBank = () => {
  const navigate = useNavigate();
  const [bank, setBank] = useState({
    bankName: "",
    accountNo: "",
    ifscCode: "",
    linkedMobileNo: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const jwtToken = getJwt();
    axios
      .post("http://localhost:3000/owner/addBankDetails", bank, {
        headers: { Authorization: `${jwtToken}` },
      })
      .then((res) => {
        toast.success("Added Bank successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/owner/dashboard");
      })
      .catch(function (error) {
        console.log(error);
        displayToast(true, error.response.data.message);
      });
  };
  return (
    <div className="form-parent-window">
      <form onSubmit={handleSubmit}>
        <h1>Add Bank</h1>
        <div className="input-div">
          <label htmlFor="inputBankName">Bank Name</label>
          <input
            type="text"
            onChange={(event) => {
              setBank({ ...bank, bankName: event.target.value });
            }}
            className="form-control"
            id="inputBankName"
            required
          />
          <label htmlFor="inputAccountNo">Account Number</label>
          <input
            type="text"
            onChange={(event) => {
              setBank({ ...bank, accountNo: event.target.value });
            }}
            className="form-control"
            id="inputAccountNo"
            required
          />
          <label htmlFor="inputIfsc">Ifsc Code</label>
          <input
            type="text"
            onChange={(event) => {
              setBank({ ...bank, ifscCode: event.target.value });
            }}
            className="form-control"
            id="inputIfsc"
            required
          />
          <label htmlFor="inputNo">Linked Phone No</label>
          <input
            type="text"
            onChange={(event) => {
              setBank({ ...bank, linkedMobileNo: event.target.value });
            }}
            className="form-control"
            id="inputNo"
            required
          />
          <button type="submit">Add bank Account</button>
        </div>
      </form>
    </div>
  );
};

export default OwnerAddBank;
