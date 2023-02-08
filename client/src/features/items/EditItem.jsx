import { useParams } from "react-router-dom";
import { selectItemById, useGetItemsQuery } from "./itemsApiSlice";
import EditItemForm from "./EditItemForm";
import { useSelector } from "react-redux";

const EditItem = () => {
  // getting id from useParams
  const { id } = useParams();

  const item = useSelector((state) => selectItemById(state, id));

  const content = item ? <EditItemForm item={item} /> : <p>Loading...</p>;

  // returning content to be displayed
  return content;
};
export default EditItem;
