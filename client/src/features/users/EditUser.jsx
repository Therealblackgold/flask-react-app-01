import { useParams } from "react-router-dom";
import { selectUserById, useGetUsersQuery } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { useSelector } from "react-redux";
// import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  // using useTitle custom hook to set a page title
  //   useTitle("gtech.COM: Update User");

  // getting id from useParams
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  // returning content to be displayed
  return content;
};
export default EditUser;
