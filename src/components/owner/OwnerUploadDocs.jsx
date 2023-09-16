import React, { useState } from "react";
import axios from "axios";
import { getJwt } from "../../services/authService";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OwnerUploadDocs() {
  const [files, setFiles] = useState();
  const navigate = useNavigate();

  function handleSubmit(event) {
    const jwtToken = getJwt();
    event.preventDefault();

    console.log(files.profile_photo);
    const url = "http://localhost:3000/owner/ownerRequest/uploadFile";
    const formData = new FormData();
    formData.append("profile_photo", files.profile_photo);
    formData.append("aadhaar_front", files.aadhar_front);
    formData.append("aadhaar_back", files.aadhar_front);
    formData.append("pan_front", files.pan_front);
    formData.append("pan_back", files.pan_back);

    formData.append("aadhaar_no", files.aadhaar_no);
    formData.append("pan_no", files.pan_no);

    const config = {
      headers: { Authorization: `${jwtToken}` },
    };
    const id = toast.loading("Uploading documents...");
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      toast.update(id, {
        render: "Uploading done",
        type: "success",
        isLoading: false,
      });
      setTimeout(() => {
        navigate("/owner/dashboard");
        toast.dismiss();
      }, 3000);
    });
  }

  return (
    <div className="form-parent-window">
      <br />
      <form onSubmit={handleSubmit}>
        <h1>Upload you docs</h1>
        <div className="input-div">
          <label htmlFor="customFile">Profile Photo</label>
          <input
            type="file"
            id="customFile"
            onChange={(e) => {
              setFiles({ ...files, profile_photo: e.target.files[0] });
            }}
            name="profile_photo"
          />
          <label htmlFor="inputAadharNo">Aadhar Number</label>
          <input
            type="text"
            id="inputAadharNo"
            onChange={(e) => {
              setFiles({ ...files, aadhaar_no: e.target.value });
            }}
          />
          <label htmlFor="customFile">Aadhar front</label>
          <input
            type="file"
            id="customFile"
            onChange={(e) => {
              setFiles({ ...files, aadhar_front: e.target.files[0] });
            }}
            name="aadhaar_front"
          />
          <label htmlFor="customFile">Aadhar Back</label>
          <input
            type="file"
            id="customFile"
            onChange={(e) => {
              setFiles({ ...files, aadhar_back: e.target.files[0] });
            }}
            name="aadhaar_back"
          />
          <label htmlFor="inputPANNo">PAN Number</label>
          <input
            type="text"
            id="inputPANNo"
            onChange={(e) => {
              setFiles({ ...files, pan_no: e.target.value });
            }}
          />

          <label htmlFor="customFile">PAN front</label>
          <input
            type="file"
            id="customFile"
            onChange={(e) => {
              setFiles({ ...files, pan_front: e.target.files[0] });
            }}
            name="pan_front"
          />
          <label htmlFor="customFile">PAN back</label>
          <input
            type="file"
            id="customFile"
            onChange={(e) => {
              setFiles({ ...files, pan_back: e.target.files[0] });
            }}
            name="pan_back"
          />
        </div>
        <div className="input-div">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OwnerUploadDocs;
