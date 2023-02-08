import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewStoreMutation } from "./storesApiSlice";

const NewStoreForm = ({ users }) => {
  // destructuring values from useAddNewStoreMutation
  const [addNewStore, { isSuccess }] = useAddNewStoreMutation();

  // navigate to redirect a user
  const navigate = useNavigate();

  const [user_id, setUser_id] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [person, setPerson] = useState("");
  const [province, setProvince] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (isSuccess) {
      // reset inputs state
      setAddress("");
      setUser_id("");
      setCity("");
      setPostal_code("");
      setEmail("");
      setDescription("");
      // redirect to stores
      navigate("/dash/shops");
    }
  }, [isSuccess, navigate]);

  //onChange function handles form changes
  const onUser_idChanged = (e) => setUser_id(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const onPostalCodeChanged = (e) => setPostal_code(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const onPersonChanged = (e) => setPerson(e.target.value);
  const onContactChanged = (e) => setContact(e.target.value);
  const onProvinceChanged = (e) => setProvince(e.target.value);

  // save handler
  const onSubmit = async (e) => {
    e.preventDefault();
    // checking if canSave is true
    await addNewStore({
      user: user_id,
      address,
      description,
      email,
      city,
      province,
      contact_number: contact,
      contact_person: person,
      postal_code,
    });
  };

  // select options
  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  // declaring content variable to hold component jsx
  const content = (
    <>
      <div className="main-card">
        <form className="form login-card" onSubmit={onSubmit}>
          <h2 className="mb-3">Add new Store</h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Address:
            </label>
            <input
              className={`form-control py-3 border-success`}
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
              className={`form-control py-3 border-success`}
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
              className={`form-control py-3 border-success`}
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
              Ccontact_person :contact Person:
            </label>
            <input
              className={`form-control py-3 border-success`}
              id="person"
              name="person"
              type="text"
              autoComplete="off"
              value={person}
              onChange={onPersonChanged}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Contact Number:
            </label>
            <input
              className={`form-control py-3 border-success`}
              id="contact"
              name="contact"
              type="text"
              autoComplete="off"
              value={contact}
              onChange={onContactChanged}
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
              onChange={onUser_idChanged}
            >
              {options}
            </select>
          </div>
          <div className="row mt-4">
            <div className="col">
              <button className="btn btn-secondary button-width py-3">
                Delete Store
              </button>
            </div>
            <div className="col">
              <button
                className="btn button-colors button-width py-3"
                type="submit"
                title="save"
              >
                Add Store
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );

  return content;
};

export default NewStoreForm;
