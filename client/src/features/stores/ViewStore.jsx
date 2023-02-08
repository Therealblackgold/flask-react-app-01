import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersApiSlice";
import { selectStoreById } from "./storesApiSlice";
import PLACEHOLDER from "../../assets/img-placeholder.png";
import { BsBoxSeam } from "react-icons/bs";

const ViewStore = () => {
  // getting store id
  const { id } = useParams();

  // getting store by passing stores state and store id
  const store = useSelector((state) => selectStoreById(state, id));

  // getting all users
  const users = useSelector(selectAllUsers);

  const content =
    store && users ? (
      <div>
        <div className="row">
          <div className="col">
            <h1>Store Name</h1>
            <div className="store-card px-3 py-5">
              <p className="headers">Description</p>
              <p>{store.description}</p>
              <p className="headers">Address</p>
              <p>{store.address}</p>
              <p className="headers">City</p>
              <p>{store.City}</p>
              <p className="headers">province</p>
              <p>{store.province}</p>
              <p className="headers">Postal Code</p>
              <p>{store.postal_code}</p>
              <p className="headers">Contact Person</p>
              <p>{store.contact_person}</p>
              <p className="headers">Contact Number</p>
              <p>{store.contact_number}</p>
              <p className="headers">Email</p>
              <p>{store.email}</p>
            </div>
          </div>
          <div className="col">
            <img src={PLACEHOLDER} alt="" />
          </div>
        </div>

        <h4>Inventory</h4>
        <hr />
        <div className="row px-0 mx-0 py-3 table-row-style align-items-items">
          <div className="col-1">
            <BsBoxSeam className="table-icons text-primary" />
          </div>
          <div className="col">item_code</div>
          <div className="col">
            item_description Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sed id itaque expedita facere ipsa qui.
          </div>
          <div className="col">cost</div>
          <div className="col">price</div>
          <div className="col">quantity</div>
          <div className="col">
            <Link to="/dash/items">
              <button className="btn btn-primary">view</button>
            </Link>
          </div>
        </div>
        <hr />
      </div>
    ) : (
      <p>Loading...</p>
    );

  return content;
};

export default ViewStore;
