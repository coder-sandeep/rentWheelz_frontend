import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <div>
        <ul>
          <li>
            <Link to="/">RentWheelz</Link>
          </li>

          <li>
            <Link to="/OwnerSignup">Owner Signup</Link>
          </li>
          <li>
            <Link to="/OwnerLogin">Owner Login</Link>
          </li>
          <li>
            <Link to="/UserSignup">User Signup</Link>
          </li>
          <li>
            <Link to="/UserLogin">UserLogin</Link>
          </li>
          <li style={{ float: "right", backgrounColor: "#17594A" }}>
            <Link to="/AdminLogin">Admin Login</Link>
          </li>
          <li style={{ float: "right", backgrounColor: "#EF6262" }}>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
