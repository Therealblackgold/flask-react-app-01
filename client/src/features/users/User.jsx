import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { BsPersonBadgeFill, BsPersonCircle, BsShop } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";

const User = ({ userId }) => {
  // passing state and userId to get a user
  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <>
        <div className="row text-center px-0 mx-0 py-3 table-row-style align-items-items">
          <div className="col-1">
            <BsPersonCircle className="table-icons" />
          </div>
          <div className="col">{user.username}</div>
          <div className="col">{user.email}</div>
          <div className="col">
            {user.admin ? (
              <BsCheckCircleFill
                className="table-icons"
                style={{ color: "green" }}
              />
            ) : (
              <BsCheckCircleFill
                className="table-icons"
                style={{ color: "lightgray" }}
              />
            )}
          </div>
          <div className="col">
            {user.blocked ? (
              <BsCheckCircleFill
                className="table-icons"
                style={{ color: "red" }}
              />
            ) : (
              <BsCheckCircleFill
                className="table-icons"
                style={{ color: "lightgray" }}
              />
            )}
          </div>
          <div className="col-1">
            <button className="btn btn-info" onClick={handleEdit}>
              update
            </button>
          </div>
          <div className="col-1">
            <button className="btn btn-success" onClick={handleEdit}>
              view
            </button>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default User;
