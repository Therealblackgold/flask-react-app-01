import { useState, useEffect } from "react";
import {
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} from "./storesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

const EditStoreForm = ({ store, users }) => {
  // destructuring form useAuth
  const { username, isManager, isAdmin } = useAuth();

  // destructuring form useUpdateStoreMutation
  const [updateStore, { isLoading, isSuccess, isError, error }] =
    useUpdateStoreMutation();

  // destructuring form useDeleteStoreMutation
  const [
    deleteStore,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteStoreMutation();

  // navigate to redirect a user
  const navigate = useNavigate();

  // state to hold store values
  const [address, setAddress] = useState(store.address);
  const [city, setCity] = useState(store.city);
  const [description, setDescription] = useState(store.description);
  const [userId, setUserId] = useState(store.user_id);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      // resetting input values
      setAddress("");
      setCity("");
      setUserId("");
      // redirecting to stores
      navigate("/dash/shops");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // handle change functions
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  // canSave function that checks all fields are completed
  const canSave = [address, city, userId].every(Boolean) && !isLoading;

  // onClick handler to save store
  const onSaveStoreClicked = async (e) => {
    if (canSave) {
      await updateStore({
        id: store.id,
        user: userId,
        address,
        city,
      });
    }
  };

  // onClick handler to delete store by id
  const onDeleteStoreClicked = async () => {
    await deleteStore({ id: store.id });
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  // dynamic classes
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validAddressClass = !address ? "form__input--incomplete" : "";
  const validCityClass = !city ? "form__input--incomplete" : "";

  // error handling
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  // delete Button
  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        address="Delete"
        onClick={onDeleteStoreClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  // ui content
  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <div className="form-wrapper">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__address-row">
            <h2>
              Edit Store {username} #{store.id}
            </h2>
            <div className="form__action-buttons">
              <button
                className="icon-button"
                address="Save"
                onClick={onSaveStoreClicked}
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              {deleteButton}
            </div>
          </div>
          <label className="form__label" htmlFor="store-address">
            Address:
          </label>
          <input
            className={`form__input ${validAddressClass}`}
            id="store-address"
            name="address"
            type="text"
            autoComplete="off"
            value={address}
            onChange={onAddressChanged}
          />
          <label className="form__label" htmlFor="store-address">
            City:
          </label>
          <input
            className={`form__input ${validAddressClass}`}
            id="store-city"
            name="city"
            value={city}
            onChange={onCityChanged}
          />

          <label className="form__label" htmlFor="store-city">
            Description
          </label>
          <textarea
            className={`form__input form__input--city ${validCityClass}`}
            id="store-description"
            name="description"
            value={description}
            onChange={onDescriptionChanged}
          />
          <div className="form__row">
            <div className="form__divider">
              <label
                className="form__label form__checkbox-container"
                htmlFor="store-username"
              >
                ASSIGNED TO:
              </label>
              <select
                id="store-username"
                name="username"
                className="form__select"
                value={userId}
                onChange={onUserIdChanged}
              >
                {options}
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );

  return content;
};

export default EditStoreForm;
