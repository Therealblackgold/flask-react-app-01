import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  // getting token from electCurrentToken
  // const token = useSelector(selectCurrentToken);
  // // state values
  // let isManager = false;
  // let isAdmin = false;
  // let status = "Employee";
  // console.log("token not available");

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      if (name === "token") {
        return value;
      }
    }
    return null;
  };

  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  const token = getTokenFromCookie();

  // if user has a token
  if (token) {
    // console.log("token available");
    // decode the token
    const decoded = jwtDecode(token);
    // console.log(decoded);

    // destructure username and roles stored inside the access token stored as UserInfo in the backend
    const { username, admin } = decoded;
    console.log(username);

    let isAdmin = admin;

    // set values that can be used to confirm user admin
    // isManager = admin.includes("Manager");
    isAdmin = admin;
    console.log(isAdmin);

    // using values above to verify user admin
    if (isManager) status = "Manager";
    if (isAdmin) status = "admin";

    // then returning values so they can be used inside components
    return { username, admin, status, isManager, isAdmin };
  }

  // return if theres no token
  return { username: "", admin: false, isManager, isAdmin, status };
};
export default useAuth;
