import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SectionHeading from "../../components/SectionHeading";
import Spinner from "../../components/spinner/Spinner";
import { selectStoreById } from "../stores/storesApiSlice";
import { useAddNewItemMutation } from "./itemsApiSlice";

const NewItemForm = () => {
  // getting store id
  const { id } = useParams();

  // getting store by passing stores state and store id
  const store = useSelector((state) => selectStoreById(state, id));

  const [addNewItem, { isLoading, isSuccess, isError, error }] =
    useAddNewItemMutation();

  const navigate = useNavigate();

  // state values
  const [item_code, setItem_code] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [store_id, setStore_id] = useState(store.id);
  const [item_description, setItem_description] = useState("");

  // onChange handlers for the form
  // const onStore_idChanged = (e) => setStore_id(e.target.value);
  const onItem_codeChanged = (e) => setItem_code(e.target.value);
  const onCostChanged = (e) => setCost(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onItem_descriptionChanged = (e) => setItem_description(e.target.value);

  // RESET FORM TEMPORARY STATE
  useEffect(() => {
    if (isSuccess) {
      navigate(`/dash/shops/view/${store.id}`);
      toast("item added to inventory");
    }
    // dependencies that might change, navigate won't change but must be added to dependency array
  }, [isSuccess, navigate, store.id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    await addNewItem({
      item_code,
      cost,
      price,
      store_id,
      item_description,
    });
  };

  if (isLoading) <Spinner />;

  const content = (
    <>
      <SectionHeading title="add new item" />
      <div className="main-card form-wrapper">
        {/* form start */}
        <form className="form" onSubmit={onSubmit}>
          <label className="form-label" htmlFor="store_id">
            store_id:
          </label>
          <input
            disabled
            className="form-control py-3 border-success"
            id="store_id"
            name="store_id"
            type="text"
            autoComplete="off"
            value={store_id}
          />
          <label className="form-label" htmlFor="item_code">
            item code:
          </label>
          <input
            className="form-control py-3 border-success"
            id="item_code"
            name="item_code"
            type="text"
            autoComplete="off"
            value={item_code}
            onChange={onItem_codeChanged}
          />
          <label className="form-label" htmlFor="itemCost">
            cost:
          </label>
          <input
            className="form-control py-3 border-success"
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
            className="form-control py-3 border-success"
            id="price"
            name="price"
            type="text"
            autoComplete="off"
            value={price}
            onChange={onPriceChanged}
          />
          <label className="form-label" htmlFor="item_description">
            Item Description:
          </label>
          <input
            className="form-control py-3 border-success"
            id="item_description"
            name="item_description"
            type="text"
            autoComplete="off"
            value={item_description}
            onChange={onItem_descriptionChanged}
          />
          <div className="row mt-4">
            <div className="col">
              <button
                className="btn button-colors button-width py-3"
                type="submit"
                title="update item"
              >
                Save
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

export default NewItemForm;
