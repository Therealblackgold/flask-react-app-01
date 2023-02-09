import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItemById } from "./itemsApiSlice";

const Item = ({ itemId }) => {
  // passing state and itemId to get a item
  const item = useSelector((state) => selectItemById(state, itemId));

  console.log(`ITEM ID: ${itemId}`);
  console.log(`ITEM AAAA: ${item}`);
  const navigate = useNavigate();

  if (item) {
    const handleEdit = () => navigate(`/dash/items/${itemId}`);

    const cellStatus = item.active ? "" : "table__cell--inactive";

    return (
      <>
        <tr className="table__row item">
          <td className={`table__cell ${cellStatus}`}>{item.item_code}</td>
          <td className={`table__cell ${cellStatus}`}>{item.id}</td>
          <td className={`table__cell ${cellStatus}`}>{item.cost}</td>
          <td className={`table__cell ${cellStatus}`}>R {item.price}</td>
          <td className={`table__cell ${cellStatus}`}>{item.store_id}</td>
          <td className={`table__cell ${cellStatus}`}>{item.user_id}</td>
          <td className={`table__cell ${cellStatus}`}>
            {item.item_description}
          </td>
          <td className={`table__cell ${cellStatus}`}>
            <button className="btn btn-info">update</button>
          </td>
          <td className={`table__cell ${cellStatus}`}>
            <button className="btn btn-success">view</button>
          </td>
        </tr>
      </>
    );
  } else return null;
};

export default Item;
