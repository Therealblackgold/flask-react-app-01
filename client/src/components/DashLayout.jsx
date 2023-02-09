import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const DashLayout = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="container px4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
