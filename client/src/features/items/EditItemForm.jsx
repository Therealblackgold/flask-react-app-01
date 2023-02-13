import { useState, useEffect } from "react";
import { useUpdateItemMutation, useDeleteItemMutation } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SectionHeading from "../../components/SectionHeading";
import { toast } from "react-toastify";

// getting useUpdateItemMutation
const EditItemForm = ({ item }) => {
  const { isManager, isAdmin } = useAuth();

  const [updateItem, { isLoading, isSuccess, isError, error }] =
    useUpdateItemMutation();

  // getting useDeleteItemMutation
  const [
    // since useUpdateItemMutation and useDeleteItemMutation reaming delete mutations so both can be used inside this component
    deleteItem,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteItemMutation();

  // navigate to redirect to another page on success
  const navigate = useNavigate();

  // state values
  const [id, setId] = useState(item.id);
  const [item_code, setItem_code] = useState(item.item_code);
  const [cost, setCost] = useState(item.cost);
  const [price, setPrice] = useState(item.price);
  const [store_id, setStore_id] = useState(item.store_id);
  const [user_id, setUser_id] = useState(item.user_id);
  const [item_description, setItem_description] = useState(
    item.item_description
  );

  useEffect(() => {
    // here we check which mutation is successful
    if (isSuccess || isDelSuccess) {
      // reset state

      // redirect to items list
      navigate("/dash/items");
      toast("item updated");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // onChange handlers for the form
  const onIdChanged = (e) => setId(e.target.value);
  const onItem_codeChanged = (e) => setItem_code(e.target.value);
  const onCostChanged = (e) => setCost(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onStore_idChanged = (e) => setStore_id(e.target.value);
  const onUser_idChanged = (e) => setUser_id(e.target.value);
  const onItem_descriptionChanged = (e) => setItem_description(e.target.value);

  // onSubmit handler
  const onSubmit = async (e) => {
    e.preventDefault();

    await updateItem({
      id,
      item_code,
      cost,
      price,
      store_id,
      user_id,
      item_description,
    });
  };

  // handleClick for delete that gets the items id and calls deleteItem mutation
  const onDeleteItemClicked = async () => {
    await deleteItem({ id: item.id });
  };

  // delete Button
  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="btn btn-secondary button-width py-3"
        address="Delete"
        onClick={onDeleteItemClicked}
      >
        Delete
      </button>
    );
  }

  const content = (
    <>
      <SectionHeading title="update item" />
      <div className="form-wrapper">
        {/* form start */}
        <form className="form" onSubmit={onSubmit}>
          <label className="form__label" htmlFor="itemName">
            id: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input `}
            id="itemName"
            name="itemName"
            type="text"
            autoComplete="off"
            value={id}
            onChange={onIdChanged}
          />
          <label className="form__label" htmlFor="item_code">
            item code: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input `}
            id="item_code"
            name="item_code"
            type="text"
            autoComplete="off"
            value={item_code}
            onChange={onItem_codeChanged}
          />
          <label className="form__label" htmlFor="itemCost">
            cost: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input `}
            id="itemCost"
            name="itemCost"
            type="text"
            autoComplete="off"
            value={cost}
            onChange={onCostChanged}
          />
          <label className="form__label" htmlFor="price">
            price: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input `}
            id="price"
            name="price"
            type="text"
            autoComplete="off"
            value={price}
            onChange={onPriceChanged}
          />
          <label className="form__label" htmlFor="store_id">
            store_id: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            disabled
            className={`form__input `}
            id="store_id"
            name="store_id"
            type="text"
            autoComplete="off"
            value={store_id}
            onChange={onStore_idChanged}
          />
          <label className="form__label" htmlFor="user_id">
            user_id: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            disabled
            className={`form__input `}
            id="user_id"
            name="user_id"
            type="text"
            autoComplete="off"
            value={user_id}
            onChange={onUser_idChanged}
          />
          <label className="form__label" htmlFor="item_description">
            item_description: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input `}
            id="item_description"
            name="item_description"
            type="text"
            autoComplete="off"
            value={item_description}
            onChange={onItem_descriptionChanged}
          />
          <div className="row mt-4">
            <div className="col">{deleteButton}</div>
            <div className="col">
              <button
                className="btn button-colors button-width py-3"
                type="submit"
                title="update item"
              >
                Update
              </button>
            </div>
          </div>
        </form>
        {/* form end */}
      </div>
    </>
  );

  return content;
};
export default EditItemForm;
