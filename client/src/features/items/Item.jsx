import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItemById } from "./itemsApiSlice";

const Item = ({ itemId }) => {
  // passing state and itemId to get a item
  const item = useSelector((state) => selectItemById(state, itemId));

  const navigate = useNavigate();

  if (item) {
    const handleEdit = () => navigate(`/dash/items/${itemId}`);

    const cellStatus = item.active ? "" : "table__cell--inactive";

    return (
      <>
        <tr className="table__row item">
          <td className={`table__cell ${cellStatus}`}>{item.id}</td>
          <td className={`table__cell ${cellStatus}`}>{item.cost}</td>
          <td className={`table__cell ${cellStatus}`}>
            {item.item_description}
          </td>
          <td className={`table__cell ${cellStatus}`}>{item.price}</td>
          <td className={`table__cell ${cellStatus}`}>
            <button className="icon-button table__button" onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </td>
        </tr>
      </>
    );
  } else return null;
};

export default Item;
