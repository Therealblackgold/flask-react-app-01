import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import WelcomeTable from "../../components/WelcomeTable";
import Widget from "../../components/Widget";
import useAuth from "../../hooks/useAuth";
import { useGetStoresQuery } from "../stores/storesApiSlice";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  // Getting the date
  const date = new Date();

  // Formatting the date
  const today = new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <>
      <div className="container px4">
        <div className="row gx-3">
          <div>{isAdmin ? <h4 className="role-badge">admin user</h4> : ""}</div>
          <h3>{today}</h3>
          <div className="widgets">
            <Widget type="users" />
            <Widget type="addUser" />
            <Widget type="stores" />
            <Widget type="addStore" />
          </div>
        </div>
      </div>
      <div className="listContainer">{/* <WelcomeTable /> */}</div>
    </>
  );
};

export default Welcome;
