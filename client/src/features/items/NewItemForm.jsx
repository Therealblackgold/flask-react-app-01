import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { useAddNewItemMutation, addNewItem } from "./itemsApiSlice";

const ITEM_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{6,12}$/;

const NewItemForm = () => {
  // getting state values
  // starting with the addNewItem function which will be called when we need to call it
  // unlike a normal query
  const [addNewItem, { isLoading, isSuccess, isError, error }] =
    useAddNewItemMutation();

  const navigate = useNavigate();
  const [itemname, setItemname] = useState("");
  const [validItemname, setValidItemname] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  // VALIDATE ITEMNAME
  useEffect(() => {
    // testing itemname with regex
    setValidItemname(ITEM_REGEX.test(itemname));
    // dependencies that might change,
  }, [itemname]);

  // VALIDATE PASSWORD
  useEffect(() => {
    // testing password with regex
    setValidPassword(PWD_REGEX.test(password));
    // dependencies that might change,
  }, [password]);

  // RESET FORM TEMPORARY STATE
  useEffect(() => {
    if (isSuccess) {
      setItemname("");
      setPassword("");
      setRoles([""]);
      navigate("/dash/items");
    }
    // dependencies that might change, navigate won't change but must be added to dependency array
  }, [isSuccess, navigate]);

  // onChange handlers
  const onItemnameChanged = (e) => setItemname(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validItemname, validPassword].every(Boolean) && !isLoading;

  const onSaveItemClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      // calling addNewItem function
      await addNewItem({ itemname, password, roles });
    }
  };

  // select options
  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  // Validation css classes
  const errClass = isError ? "errmsg" : "offscreen";
  const validItemClass = !validItemname ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <div className="form-wrapper">
        <form action="" className="form" onSubmit={onSaveItemClicked}>
          <div className="form__title-row">
            <h2>New Item</h2>
            <div className="form__actions-buttons">
              <button className="icon-button" title="Save" disabled={!canSave}>
                <FontAwesomeIcon icon={faSave} />
              </button>
            </div>
          </div>
          <label htmlFor="itemname" className="form__label">
            Itemname: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form__input ${validItemClass}`}
            type="text"
            id="itemname"
            name="itemname"
            autoComplete="off"
            value={itemname}
            onChange={onItemnameChanged}
          />
          <label htmlFor="password" className="form__label">
            Password: <span className="nowrap">[6-12 chars incl. !@#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass}`}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onPasswordChanged}
          />
          <label htmlFor="password" className="form__label">
            ASSIGNED ROLES:
          </label>
          <select
            className={`form__input ${validRolesClass}`}
            name="roles"
            id="roles"
            multiple={true}
            size="3"
            value={roles}
            onChange={onRolesChanged}
          >
            {options}
          </select>
        </form>
      </div>
    </>
  );

  return content;
};

export default NewItemForm;
