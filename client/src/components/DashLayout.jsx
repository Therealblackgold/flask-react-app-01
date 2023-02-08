import { Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";
import Sidebar from "./sidebar/Sidebar";

const DashLayout = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="container px4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
