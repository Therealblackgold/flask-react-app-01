import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation, addNewUser } from "./usersApiSlice";

const NewUserForm = () => {
  // getting state values
  // starting with the addNewUser function which will be called when we need to call it
  // unlike a normal query
  const [addNewUser, { isSuccess }] = useAddNewUserMutation();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  // VALIDATE PASSWORD
  // useEffect(() => {
  //   // testing password with regex
  //   setValidPassword(PWD_REGEX.test(password));
  //   // dependencies that might change,
  // }, [password]);

  // RESET FORM TEMPORARY STATE
  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setEmail("");
      setPassword("");
      setAdmin([""]);
      navigate("/dash/users");
    }
    // dependencies that might change, navigate won't change but must be added to dependency array
  }, [isSuccess, navigate]);

  // onChange handlers
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onAdminChanged = () => setAdmin((prev) => !prev);

  // const onAdminChanged = (e) => {
  //   const values = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setAdmin(values);
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    // calling addNewUser function
    await addNewUser({ username, password, email, admin });
  };

  const content = (
    <>
      <div className="md main-card">
        <form
          action=""
          className="form login-card"
          onSubmit={onSubmit}
          autoComplete="off"
        >
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control py-3 border-success"
              id="email"
              aria-describedby="email"
              placeholder="Email"
              value={email}
              onChange={onEmailChanged}
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

          <center>
            <button
              title="save"
              type="submit"
              className="btn button-colors py-3"
            >
              Create User
            </button>
          </center>
        </form>
      </div>
    </>
  );

  return content;
};

export default NewUserForm;
