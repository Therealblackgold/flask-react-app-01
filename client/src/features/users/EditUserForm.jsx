import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

// getting useUpdateUserMutation
const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  // getting useDeleteUserMutation
  const [
    // since useUpdateUserMutation and useDeleteUserMutation reaming delete mutations so both can be used inside this component
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  // navigate to redirect to another page on success
  const navigate = useNavigate();

  // state values
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [admin, setAdmin] = useState(user.admin);
  const [blocked, setBlocked] = useState(user.blocked);

  // form validations
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    // here we check which mutation is successful
    if (isSuccess || isDelSuccess) {
      // reset state
      setUsername("");
      setPassword("");
      // setAdmin([]);
      // redirect to users list
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // onChange handlers for the form
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  // onBlockedChanged toggles blocked to true or false
  const onBlockedChanged = () => setBlocked((prev) => !prev);
  const onAdminChanged = () => setAdmin((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    // checking if theres a password since the password won't be changed in most cases
    if (password) {
      // calling update user with a password
      await updateUser({ id: user.id, username, password, admin, blocked });
    } else {
      // calling update user without a password
      await updateUser({ id: user.id, username, admin, blocked });
    }
  };

  // handleClick for delete that gets the users id and calls deleteUser mutation
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  // canSave function that checks all fields are completed
  let canSave;

  if (password) {
    canSave = [validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername].every(Boolean) && !isLoading;
  }

  // Validation css classes
  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";

  // error handling / if error or delError are undefined return empty string ""
  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  const content = (
    <section>
      <p className={errClass}>{errContent}</p>
      <div className="main-card">
        {/* form start */}
        <form className="form login-card" onSubmit={(e) => e.preventDefault()}>
          <h2 className="mb-3">Edit User</h2>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control py-3 border-success"
              id="username"
              aria-describedby="username"
              placeholder="Username"
              value={username}
              onChange={onUsernameChanged}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control py-3 border-success"
              id="password"
              aria-describedby="password"
              placeholder="Password"
              value={password}
              onChange={onPasswordChanged}
            />
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label
                  className="form__label form__checkbox-container"
                  htmlFor="admin-user"
                >
                  ADMIN STATUS:
                  <input
                    className="form__checkbox"
                    id="user-blocked"
                    name="admin-user"
                    type="checkbox"
                    checked={admin}
                    onChange={onAdminChanged}
                  />
                </label>
              </div>
            </div>
            <div className="col">
              <label
                className="form__label form__checkbox-container"
                htmlFor="user-blocked"
              >
                BLOCKED:
                <input
                  className="form__checkbox"
                  id="user-blocked"
                  name="user-blocked"
                  type="checkbox"
                  checked={blocked}
                  onChange={onBlockedChanged}
                />
              </label>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col">
              <button
                className="btn btn-secondary button-width py-3"
                onClick={onDeleteUserClicked}
              >
                Delete User
              </button>
            </div>
            <div className="col">
              <button
                className="btn button-colors button-width py-3"
                onClick={onSaveUserClicked}
              >
                Update User
              </button>
            </div>
          </div>
        </form>
        {/* form end */}
      </div>
    </section>
  );

  return content;
};
export default EditUserForm;
