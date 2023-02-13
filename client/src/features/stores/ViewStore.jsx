import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersApiSlice";
import { selectStoreById, selectStoreIds } from "./storesApiSlice";
import PLACEHOLDER from "../../assets/img-placeholder.png";
import ItemsList from "../items/ItemsList";
import SectionHeading from "../../components/SectionHeading";
import { BsFillPlusCircleFill, BsPenFill } from "react-icons/bs";
import Spinner from "../../components/spinner/Spinner";

const ViewStore = () => {
  // getting store id
  const { id } = useParams();

  // getting store by passing stores state and store id
  const store = useSelector((state) => selectStoreById(state, id));

  // getting all users
  const users = useSelector(selectAllUsers);

  const navigate = useNavigate();

  const handleAddItem = () => navigate(`/dash/shops/${store.id}/add/item`);
  const handleEdit = () => navigate(`/dash/shops/${store.id}/update/item`);

  const content =
    store && users ? (
      <div>
        <div className="row text-start">
          <div className="col">
            <SectionHeading title="store details page" />
            <div className="col">
              <button className="btn btn-secondary">
                update store details
              </button>
            </div>
            <ul className="store-display">
              <li>
                <span className="headers">update store details</span> :{" "}
                <button className="btn" onClick={handleEdit}>
                  <BsPenFill className="edit-icon" />
                </button>
              </li>
              <li>
                <span className="headers">add store inventory</span> :{" "}
                <button className="btn" onClick={handleAddItem}>
                  <BsFillPlusCircleFill className="edit-icon" />
                </button>
              </li>
              <li>
                <span className="headers">Owner</span> : {store.user_id}
              </li>
              <li>
                <span className="headers">Address</span> : {store.address}
              </li>
              <li>
                <span className="headers">City</span> : {store.city}
              </li>
              <li>
                <span className="headers">province</span> : {store.province}
              </li>
              <li>
                {" "}
                <span className="headers">Postal Code</span> :{" "}
                {store.postal_code}
              </li>
              <li>
                <span className="headers">Contact Person</span> :{" "}
                {store.contact_person}
              </li>
              <li>
                {" "}
                <span className="headers">Contact Number</span> :{" "}
                {store.contact_number}
              </li>
              <li>
                <span className="headers">Email</span> : {store.email}
              </li>
              <li>
                <span className="headers">Description</span> :{" "}
                {store.description}
              </li>
            </ul>
          </div>
          <div className="col">
            <img src={PLACEHOLDER} alt="" />
          </div>
        </div>

        <h4 className="my-5">Inventory</h4>
        <ItemsList />
      </div>
    ) : (
      <Spinner />
    );

  return content;
};

export default ViewStore;
