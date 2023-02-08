import { BsPeopleFill, BsPersonPlusFill } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar d-none d-md-block bg-dark text-white">
      <div className="top"></div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dash" className="sidebar-link">
            <MdSpaceDashboard className="icon" />
            <span>Dashboard </span>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/dash/shops" className="sidebar-link">
            <MdSpaceDashboard className="icon" />
            <span>stores</span>
          </Link>
          <Link to="/dash/shops/new" className="sidebar-link">
            <MdPeople className="icon" />
            <span>add store</span>
          </Link>
          <Link to="/dash/users" className="sidebar-link">
            <BsPeopleFill className="icon" />
            <span>users</span>
          </Link>
          <Link to="/dash/users/new" className="sidebar-link">
            <BsPersonPlusFill className="icon" />
            <span>add new user</span>
          </Link>
          <Link to="/dash/items" className="sidebar-link">
            <MdSpaceDashboard className="icon" />
            <span>Inventory</span>
          </Link>
          <Link className="sidebar-link">
            <MdSpaceDashboard className="icon" />
            <span>Orders</span>
          </Link>
          <p className="title">USER</p>
          <Link className="sidebar-link">
            <MdSpaceDashboard className="icon" />
            <span>Profile</span>
          </Link>
          <Link className="sidebar-link">
            <MdSpaceDashboard className="icon" />
            <span>Logout</span>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOptions"></div>
        <div className="colorOptions"></div>
      </div>
    </div>
  );
};

export default Sidebar;
