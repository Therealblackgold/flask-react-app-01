import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewStoreForm from "./NewStoreForm";

const NewStore = () => {
  const users = useSelector(selectAllUsers);

  if (!users?.length) return <p>Not Currently Available</p>;

  const content = <NewStoreForm users={users} />;

  return content;
};

export default NewStore;
