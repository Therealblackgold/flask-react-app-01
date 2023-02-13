// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SectionHeading from "../../components/SectionHeading";
// import { useAddNewItemMutation, addNewItem } from "./itemsApiSlice";

// const NewItemForm = ({ store }) => {
//   // getting state values
//   // starting with the addNewItem function which will be called when we need to call it
//   // unlike a normal query
//   const [addNewItem, { isLoading, isSuccess, isError, error }] =
//     useAddNewItemMutation();

//   const navigate = useNavigate();

//   // state values
//   const [item_code, setItem_code] = useState("");
//   const [cost, setCost] = useState("");
//   const [price, setPrice] = useState("");
//   const [store_id, setStore_id] = useState(store.id);
//   const [item_description, setItem_description] = useState("");

//   // onChange handlers for the form
//   const onItem_codeChanged = (e) => setItem_code(e.target.value);
//   const onCostChanged = (e) => setCost(e.target.value);
//   const onPriceChanged = (e) => setPrice(e.target.value);
//   const onStore_idChanged = (e) => setStore_id(e.target.value);
//   const onItem_descriptionChanged = (e) => setItem_description(e.target.value);

//   // RESET FORM TEMPORARY STATE
//   useEffect(() => {
//     if (isSuccess) {
//       navigate("/dash/items");
//     }
//     // dependencies that might change, navigate won't change but must be added to dependency array
//   }, [isSuccess, navigate]);

//   // onSubmit handler
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     await addNewItem({
//       item_code,
//       cost,
//       price,
//       store_id,
//       item_description,
//     });
//   };

//   const content = (
//     <>
//       <SectionHeading title="add new item" />
//       <div className="form-wrapper">
//         {/* form start */}
//         <form className="form" onSubmit={onSubmit}>
//           <label className="form__label" htmlFor="item_code">
//             item code: <span className="nowrap">[3-20 letters]</span>
//           </label>
//           <input
//             className={`form__input `}
//             id="item_code"
//             name="item_code"
//             type="text"
//             autoComplete="off"
//             value={item_code}
//             onChange={onItem_codeChanged}
//           />
//           <label className="form__label" htmlFor="itemCost">
//             cost: <span className="nowrap">[3-20 letters]</span>
//           </label>
//           <input
//             className={`form__input `}
//             id="itemCost"
//             name="itemCost"
//             type="text"
//             autoComplete="off"
//             value={cost}
//             onChange={onCostChanged}
//           />
//           <label className="form__label" htmlFor="price">
//             price: <span className="nowrap">[3-20 letters]</span>
//           </label>
//           <input
//             className={`form__input `}
//             id="price"
//             name="price"
//             type="text"
//             autoComplete="off"
//             value={price}
//             onChange={onPriceChanged}
//           />
//           <label className="form__label" htmlFor="store_id">
//             store_id: <span className="nowrap">[3-20 letters]</span>
//           </label>
//           <input
//             disabled
//             className={`form__input `}
//             id="store_id"
//             name="store_id"
//             type="text"
//             autoComplete="off"
//             value={store_id}
//             onChange={onStore_idChanged}
//           />
//           <label className="form__label" htmlFor="item_description">
//             item_description: <span className="nowrap">[3-20 letters]</span>
//           </label>
//           <input
//             className={`form__input `}
//             id="item_description"
//             name="item_description"
//             type="text"
//             autoComplete="off"
//             value={item_description}
//             onChange={onItem_descriptionChanged}
//           />
//           <div className="row mt-4">
//             <div className="col">
//               <button
//                 className="btn button-colors button-width py-3"
//                 type="submit"
//                 title="update item"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </form>
//         {/* form end */}
//       </div>
//     </>
//   );

//   return content;
// };

// export default NewItemForm;

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
      <div className="form-wrapper">
        {/* form start */}
        <form className="form" onSubmit={onSubmit}>
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
            hidden={true}
            // onChange={onStore_idChanged}
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
            <div className="col">
              <button
                className="btn button-colors button-width py-3"
                type="submit"
                title="update item"
              >
                save
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
