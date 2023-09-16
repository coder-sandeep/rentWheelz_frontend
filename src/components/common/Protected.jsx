import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
function Protected(props) {
  const navigate = useNavigate();
  const { Component, to } = props;

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.ownerId) navigate(to);
  });

  return (
    <>
      <Component />
    </>
  );
}
export default Protected;
