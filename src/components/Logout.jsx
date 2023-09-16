import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  });
  localStorage.clear();
  return;
};

export default Logout;
