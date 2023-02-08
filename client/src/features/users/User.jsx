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
        <div className="row px-0 mx-0 py-3 table-row-style align-items-items">
          <div className="col-1">
            <BsPersonCircle className="table-icons" />
          </div>
          <div className="col">{user.username}</div>
          <div className="col">{user.email}</div>
          <div className="col">
            <BsCheckCircleFill className="table-icons" />
          </div>
          <div className="col">
            <BsCheckCircle className="table-icons" />
          </div>
          <div className="col-1">
            <button className="btn btn-dark" onClick={handleEdit}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="table-icons"
                style={{ color: "#79c142" }}
              />
            </button>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default User;
