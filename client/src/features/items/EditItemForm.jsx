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
  const [item_description, setItem_description] = useState(
    item.item_description
  );

  useEffect(() => {
    // here we check which mutation is successful
    if (isSuccess || isDelSuccess) {
      // reset state

      // redirect to items list
      navigate(`/dash/shops/view/${store_id}`);
      toast("item updated");
    }
  }, [isSuccess, isDelSuccess, navigate, store_id]);

  // onChange handlers for the form
  const onIdChanged = (e) => setId(e.target.value);
  const onItem_codeChanged = (e) => setItem_code(e.target.value);
  const onCostChanged = (e) => setCost(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onStore_idChanged = (e) => setStore_id(e.target.value);
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
      <div className="main-card form-wrapper">
        {/* form start */}
        <form className="form" onSubmit={onSubmit}>
          <label className="form-label" htmlFor="itemName">
            Item ID:
          </label>
          <input
            className="form-control py border-success"
            id="itemName"
            name="itemName"
            type="text"
            autoComplete="off"
            value={id}
            onChange={onIdChanged}
          />
          <label className="form-label" htmlFor="item_code">
            Item Code:
          </label>
          <input
            className="form-control py border-success"
            id="item_code"
            name="item_code"
            type="text"
            autoComplete="off"
            value={item_code}
            onChange={onItem_codeChanged}
          />
          <label className="form-label" htmlFor="itemCost">
            Cost:
          </label>
          <input
            className="form-control py border-success"
            id="itemCost"
            name="itemCost"
            type="text"
            autoComplete="off"
            value={cost}
            onChange={onCostChanged}
          />
          <label className="form-label" htmlFor="price">
            Price:
          </label>
          <input
            className="form-control py border-success"
            id="price"
            name="price"
            type="text"
            autoComplete="off"
            value={price}
            onChange={onPriceChanged}
          />
          <label className="form-label" htmlFor="store_id">
            Store ID:
          </label>
          <input
            disabled
            className="form-control py border-success"
            id="store_id"
            name="store_id"
            type="text"
            autoComplete="off"
            value={store_id}
            onChange={onStore_idChanged}
          />
          <label className="form-label" htmlFor="item_description">
            Item Description:
          </label>
          <input
            className="form-control py border-success"
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
