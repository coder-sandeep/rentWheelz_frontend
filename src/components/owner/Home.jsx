import { useOutletContext } from "react-router-dom";
const Home = (props) => {
  const [owner, ownerDetails] = useOutletContext();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FAE3D9",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
      }}
    >
      <h1>Hello👋 {owner.name}</h1>

      <div>
        {ownerDetails.status === "pending" ? (
          <h3>Your account is under review</h3>
        ) : (
          <h3>Your account is Activated</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
