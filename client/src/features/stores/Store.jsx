import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStoreById } from "./storesApiSlice";
import { BsShop } from "react-icons/bs";

const Store = ({ storeId }) => {
  // passing state and storeId to get a store
  const store = useSelector((state) => selectStoreById(state, storeId));

  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/shops/${storeId}`);
  const handleView = () => navigate(`/dash/shops/view/${storeId}`);

  return (
    <>
      <div className="row px-0 mx-0 py-3 table-row-style align-items-items">
        <div className="col-1">
          <BsShop className="table-icons" />
        </div>
        <div className="col">{store.id}</div>
        <div className="col">{store.address}</div>
        <div className="col">{store.city}</div>
        <div className="col">{store.province}</div>
        <div className="col-1">
          <button className="btn btn-info" onClick={handleEdit}>
            update
          </button>
        </div>
        <div className="col-1">
          <button className="btn btn-success" onClick={handleView}>
            view
          </button>
        </div>
      </div>
    </>
  );
};
export default Store;
