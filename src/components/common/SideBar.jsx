import { Link, useLocation } from "react-router-dom";
import "../../styles/nav_sidebar.css";

const SideBar = (props) => {
  const location = useLocation();

  return (
    <>
      <div className="sidebar">
        <Link to={"/"}>
          <header>
            <div className="image-text">
              <span className="image"></span>
              <div className="text logo-text">
                <span className="name">RentWheelz</span>
              </div>
            </div>
            <i className="bx bx-chevron-right toggle"></i>
          </header>
        </Link>

        <ul className="menu-links">
          {props.data.map((element) => {
            return (
              <li
                key={element.title}
                className={
                  location.pathname == element.to
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <Link to={element.to}>
                  <i className={element.iconClass} />
                  <span className="text nav-text">{element.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="menu-links-bottom">
          <li className="sidebar-bottom-li"></li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
