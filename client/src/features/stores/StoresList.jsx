import React from "react";
import Store from "./Store";
import { useGetStoresQuery } from "./storesApiSlice";
import useAuth from "../../hooks/useAuth";

const StoresList = () => {
  const { username, isManager, isAdmin } = useAuth();
  const {
    data: stores,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStoresQuery("storesList", {
    // Extra fields that refetch data at certain intervals
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  // if state is loading display spinner
  if (isLoading) content = <p>Loading...</p>;

  // if state error display error message
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    // destructuring ids from stores data
    const { ids } = stores;

    const tableContent = ids?.length
      ? ids.map((storeId) => <Store key={storeId} storeId={storeId} />)
      : null;

    content = (
      <>
        <h1>Stores</h1>
        <section className="container mt-5 bg-light table-component py-5">
          <div className="row bg-white px-0 mx-0 py-3 table-row-style align-items-items">
            <div className="col-1" />
            <div className="col fw-bold">address</div>
            <div className="col fw-bold">city</div>
            <div className="col fw-bold">province</div>
            <div className="col-1" />
          </div>
          <hr />
          {tableContent}
        </section>
      </>
    );
  }

  return content;
};

export default StoresList;
