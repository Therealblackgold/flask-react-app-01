import { useState, useEffect } from "react";
import { useUpdateItemMutation, useDeleteItemMutation } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const ITEM_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

// getting useUpdateItemMutation
const EditItemForm = ({ item }) => {
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
  const [itemname, setItemname] = useState(item.itemname);
  const [validItemname, setValidItemname] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(item.roles);
  const [active, setActive] = useState(item.active);

  // form validations
  useEffect(() => {
    setValidItemname(ITEM_REGEX.test(itemname));
  }, [itemname]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    // here we check which mutation is successful
    if (isSuccess || isDelSuccess) {
      // reset state
      setItemname("");
      setPassword("");
      setRoles([]);
      // redirect to items list
      navigate("/dash/items");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // onChange handlers for the form
  const onItemnameChanged = (e) => setItemname(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    // making an array of selected options
    // storing the array as values
    // so a item can have more than one role
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  // onActiveChanged toggles active to true or false
  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveItemClicked = async (e) => {
    // checking if theres a password since the password won't be changed in most cases
    if (password) {
      // calling update item with a password
      await updateItem({ id: item.id, itemname, password, roles, active });
    } else {
      // calling update item without a password
      await updateItem({ id: item.id, itemname, roles, active });
    }
  };

  // handleClick for delete that gets the items id and calls deleteItem mutation
  const onDeleteItemClicked = async () => {
    await deleteItem({ id: item.id });
  };

  // roles options
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  // canSave function that checks all fields are completed
  let canSave;

  if (password) {
    canSave =
      [roles.length, validItemname, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validItemname].every(Boolean) && !isLoading;
  }

  // Validation css classes
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validItemClass = !validItemname ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  // error handling / if error or delError are undefined return empty string ""
  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <div className="form-wrapper">
        {/* form start */}
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form__title-row">
            <h2>Edit Item</h2>
            <div className="form__action-buttons">
              <button
                className="icon-button"
                title="Save"
                onClick={onSaveItemClicked}
                disabled={!canSave}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteItemClicked}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
          <label className="form__label" htmlFor="itemname">
            Itemname: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input ${validItemClass}`}
            id="itemname"
            name="itemname"
            type="text"
            autoComplete="off"
            value={itemname}
            onChange={onItemnameChanged}
          />

          <label className="form__label" htmlFor="password">
            Password: <span className="nowrap">[empty = no change]</span>{" "}
            <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass}`}
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />

          <label
            className="form__label form__checkbox-container"
            htmlFor="item-active"
          >
            ACTIVE:
            <input
              className="form__checkbox"
              id="item-active"
              name="item-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
            />
          </label>

          <label className="form__label" htmlFor="roles">
            ASSIGNED ROLES:
          </label>
          <select
            id="roles"
            name="roles"
            className={`form__select ${validRolesClass}`}
            multiple={true}
            size="3"
            value={roles}
            onChange={onRolesChanged}
          >
            {options}
          </select>
        </form>
        {/* form end */}
      </div>
    </>
  );

  return content;
};
export default EditItemForm;
