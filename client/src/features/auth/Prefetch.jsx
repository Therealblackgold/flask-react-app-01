import { store } from "../../app/store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { storesApiSlice } from "../stores/storesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";

const Prefetch = () => {
  useEffect(() => {
    // the code below will help keep the app state subscribed longer than 60 sec which is the default behavior
    // this also helps keeping state when the page is refreshed and prefilling forms
    console.log("subscribing");
    // creating manual subscriptions
    const stores = store.dispatch(
      storesApiSlice.endpoints.getStores.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    // clean up method
    return () => {
      // here the state will unsubscribe when the component is unmounted
      console.log("unsubscribing");
      stores.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
