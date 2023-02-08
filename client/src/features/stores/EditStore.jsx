import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersApiSlice";
import EditStoreForm from "./EditStoreForm";
import { selectStoreById } from "./storesApiSlice";

const EditStore = () => {
  // getting store id
  const { id } = useParams();

  // getting store by passing stores state and store id
  const store = useSelector((state) => selectStoreById(state, id));

  // getting all users
  const users = useSelector(selectAllUsers);

  const content =
    store && users ? (
      <EditStoreForm store={store} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};

export default EditStore;
