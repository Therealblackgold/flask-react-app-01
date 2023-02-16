import { useState, useEffect } from "react";
import {
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} from "./storesApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SectionHeading from "../../components/SectionHeading";

const EditStoreForm = ({ store, users }) => {
  // destructuring form useAuth
  const { isManager, isAdmin } = useAuth();

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
  const [contact_person, setContactPerson] = useState(store.contact_person);
  const [description, setDescription] = useState(store.description);
  const [email, setEmail] = useState(store.email);
  const [id, setId] = useState(store.id);
  const [user_id, setUserId] = useState(store.user_id);
  const [postal_code, setPostalCode] = useState(store.postal_code);
  const [province, setProvince] = useState(store.province);
  const [contact_number, setContactNumber] = useState(store.province);

  //onChange function handles form changes
  // handle change functions
  const onIdChanged = (e) => setId(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const onPostalCodeChanged = (e) => setPostalCode(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onPersonChanged = (e) => setContactPerson(e.target.value);
  const onContactNumberChanged = (e) => setContactNumber(e.target.value);
  const onProvinceChanged = (e) => setProvince(e.target.value);

  // onClick handler to save store
  const onSubmit = async (e) => {
    e.preventDefault();
    // checking if canSave is true

    console.log({
      id,
      address,
      city,
      contact_number,
      contact_person,
      description,
      email,
      postal_code,
      user_id,
      province,
    });
    await updateStore({
      id,
      address,
      city,
      contact_number,
      contact_person,
      description,
      email,
      postal_code,
      user_id,
      province,
    });
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      // resetting input values
      setAddress("");
      setCity("");
      setUserId("");
      // redirecting to stores
      navigate(`/dash/shops/view/${store.id}`);
    }
  }, [isSuccess, isDelSuccess, navigate, store.id]);

  // onClick handler to delete store by id
  const onDeleteStoreClicked = async () => {
    await deleteStore({ id: store.id });
  };

  // const onUserChanged = (e) => setUserId(e.target.value);

  const onUserChanged = (e) => {
    setUserId(Number(e.target.value));
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  // delete Button
  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="btn btn-secondary button-width py-3"
        address="Delete"
        onClick={onDeleteStoreClicked}
      >
        Delete Store
      </button>
    );
  }

  // ui content
  const content = (
    <>
      <SectionHeading title="update store" />
      <div className="main-card">
        <form className="form login-card" onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              ID:
            </label>
            <input
              className="form-control py-3 border-success"
              id="address"
              name="address"
              type="text"
              autoComplete="off"
              value={id}
              onChange={onIdChanged}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Address:
            </label>
            <input
              className="form-control py-3 border-success"
              id="address"
              name="address"
              type="text"
              autoComplete="off"
              value={address}
              onChange={onAddressChanged}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              City:
            </label>
            <input
              className="form-control py-3 border-success"
              id="city"
              name="city"
              type="text"
              autoComplete="off"
              value={city}
              onChange={onCityChanged}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              Postal Code:
            </label>
            <input
              className="form-control py-3 border-success"
              id="postal_code"
              name="postal_code"
              type="text"
              autoComplete="off"
              value={postal_code}
              onChange={onPostalCodeChanged}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              Province:
            </label>
            <input
              className="form-control py-3 border-success"
              id="province"
              name="province"
              type="text"
              autoComplete="off"
              value={province}
              onChange={onProvinceChanged}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description:</label>
            <input
              className="form-control py-3 border-success"
              id="description"
              name="description"
              type="text"
              autoComplete="off"
              value={description}
              onChange={onDescriptionChanged}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              className="form-control py-3 border-success"
              id="email"
              name="email"
              type="text"
              autoComplete="off"
              value={email}
              onChange={onEmailChanged}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Contact_person :contact Person:
            </label>
            <input
              className="form-control py-3 border-success"
              id="person"
              name="person"
              type="text"
              autoComplete="off"
              value={contact_person}
              onChange={onPersonChanged}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Contact Number:
            </label>
            <input
              className="form-control py-3 border-success"
              id="contact"
              name="contact"
              type="text"
              autoComplete="off"
              value={contact_number}
              onChange={onContactNumberChanged}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label form__checkbox-container"
              htmlFor="username"
            >
              Owner:
            </label>
            <select
              id="user_id"
              name="user_id"
              className="form__select form-control py-3 border-success"
              value={user_id}
              onChange={onUserChanged}
            >
              {options}
            </select>
          </div>
          <div className="row mt-4">
            <div className="col">{deleteButton}</div>
            <div className="col">
              <button
                className="btn button-colors button-width py-3"
                type="submit"
                title="update store"
              >
                Update Store
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );

  return content;
};

export default EditStoreForm;
