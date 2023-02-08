import { useParams } from "react-router-dom";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { useSelector } from "react-redux";

const EditUser = () => {
  // getting id from useParams
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  // returning content to be displayed
  return content;
};
export default EditUser;
