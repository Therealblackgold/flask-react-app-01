import { useParams } from "react-router-dom";
import { selectItemById, useGetItemsQuery } from "./itemsApiSlice";
import EditItemForm from "./EditItemForm";
import { useSelector } from "react-redux";
// import useTitle from "../../hooks/useTitle";

const EditItem = () => {
  // using useTitle custom hook to set a page title
  //   useTitle("gtech.COM: Update Item");

  // getting id from useParams
  const { id } = useParams();

  const item = useSelector((state) => selectItemById(state, id));

  const content = item ? <EditItemForm item={item} /> : <p>Loading...</p>;

  // returning content to be displayed
  return content;
};
export default EditItem;
