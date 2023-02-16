import React from "react";
import Widget from "../../components/Widget";
import useAuth from "../../hooks/useAuth";
import ItemsList from "../items/ItemsList";
import StoresList from "../stores/StoresList";

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
          <div>
            {isAdmin ? <h4 className="section-heading">admin user</h4> : ""}
          </div>
          <h3>{today}</h3>
          <div className="widgets mb-5">
            <Widget type="users" />
            <Widget type="addUser" />
            <Widget type="stores" />
            <Widget type="addStore" />
          </div>
        </div>
      </div>
      <div className="listContainer">
        <StoresList />
      </div>
    </>
  );
};

export default Welcome;
