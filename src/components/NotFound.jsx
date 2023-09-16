import animation from "../assets/404_animation.gif";
const NotFound = () => {
  return (
    <div className="mycontainer text-center">
      <h1 style={{ fontSize: 80 }}>Nothing in here</h1>
      <img src={animation} />
    </div>
  );
};

export default NotFound;
