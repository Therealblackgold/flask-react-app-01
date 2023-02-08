import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { selectStoreById } from "../features/stores/storesApiSlice";

const WelcomeTableRow = ({ storeId }) => {
  // passing state and storeId to get a store
  const store = useSelector((state) => selectStoreById(state, storeId));

  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/shops/${storeId}`);
  const handleView = () => navigate(`/dash/shops/view/${storeId}`);

  return (
    <>
      <div className="row px-0 mx-0 py-3 table-row-style align-items-items">
        <div className="col-1">
          <i className="bi bi-shop table-icons" />
        </div>
        <div className="col">{store.id}</div>
        <div className="col">{store.address}</div>
        <div className="col">{store.city}</div>
        <div className="col">{store.postal_code}</div>
        <div className="col">
          <button className="btn btn-dark" onClick={handleView}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <div className="col-1">
          <Link to="/">
            <button className="btn btn-primary">view</button>
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
};

export default WelcomeTableRow;
