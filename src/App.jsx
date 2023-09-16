import "./App.css";
import HomePage from "./components/HomePage";
import Home from "./components/owner/Home";
import NavBar from "./components/common/NavBar";
import NotFound from "./components/NotFound";
import OwnerSignup from "./components/owner/OwnerSignup";
import { Route, Routes, Navigate } from "react-router-dom";
import OwnerLogin from "./components/owner/OwnerLogin";
import UserLogin from "./components/user/UserLogin";
import UserSignup from "./components/user/UserSignup";
import OwnerDashboard from "./components/owner/OwnerDashboard";
import Logout from "./components/Logout";
import AdminLogin from "./components/admin/AdminLogin";
import Protected from "./components/common/Protected";
import OwnerUploadDocs from "./components/owner/OwnerUploadDocs";
import OwnerAddBank from "./components/owner/OwnerAddBank";
import OwnerAddAddress from "./components/owner/OwnerAddAddress";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import OwnerAddVehicle from "./components/owner/OwnerAddVehicle";
import UserRentVehicle from "./components/user/UserRentVehicle";
import Dashboard from "./components/owner/Dashboard";
import MyVehicle from "./components/owner/MyVehicle";
import Rentals from "./components/owner/Rentals";
import Chat from "./components/owner/Chat";
import Wallet from "./components/owner/Wallet";
import DashboardUser from "./components/user/DashboardUser";
import UserHome from "./components/user/UserHome";
import UserVehicles from "./components/user/UserVehicles";
import UserRentals from "./components/user/UserRentals";
import UserChats from "./components/user/UserChats";
import UserWallet from "./components/user/Wallet";
import AdminHome from "./components/admin/AdminHome";
import OwnerRequests from "./components/admin/OwnerRequests";
import VehicleRequests from "./components/admin/VehicleRequests";

const displayToast = (error, message) => {
  error == true ? toast.error(message) : toast.success(message);
};

function App() {
  return (
    <>
      <div>
        <ToastContainer />
      </div>

      <div className="routes-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notFound" element={<NotFound />} />

          <Route path="/ownerSignup" element={<OwnerSignup />} />
          <Route path="/ownerLogin" element={<OwnerLogin />} />
          <Route path="/uploadDocs" element={<OwnerUploadDocs />} />
          <Route path="/addBank" element={<OwnerAddBank />} />
          <Route path="/addAddress" element={<OwnerAddAddress />} />
          <Route path="/addVehicle" element={<OwnerAddVehicle />} />
          <Route path="/owner/dashboard" element={<Dashboard />}>
            <Route path="" element={<Home />} />
            <Route path="vehicles" element={<MyVehicle />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="chats" element={<Chat />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="*" element={<Navigate to="" />} />
          </Route>
          <Route
            path="/ownerDashboard"
            element={<Protected Component={OwnerDashboard} to="/ownerLogin" />}
          />

          <Route path="/user/dashboard" element={<DashboardUser />}>
            <Route path="" element={<UserHome />} />
            <Route path="vehicles" element={<UserVehicles />} />
            <Route path="rentals" element={<UserRentals />} />
            <Route path="chats" element={<UserChats />} />
            <Route path="wallet" element={<UserWallet />} />
            <Route path="*" element={<Navigate to="" />} />
          </Route>
          <Route path="/userSignup" element={<UserSignup />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/rentVehicle/:vehicleId" element={<UserRentVehicle />} />

          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route path="" element={<AdminHome />} />
            <Route path="owner-requests" element={<OwnerRequests />} />
            <Route path="vehicle-requests" element={<VehicleRequests />} />
            <Route path="*" element={<Navigate to="" />} />
          </Route>

          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </>
  );
}
export { displayToast };
export default App;
