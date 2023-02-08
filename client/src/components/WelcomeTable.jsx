import React from "react";
import { useGetStoresQuery } from "../features/stores/storesApiSlice";
import WelcomeTableRow from "./WelcomeTableRow";

const WelcomeTable = () => {
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
    const { ids } = stores;

    const tableContent = ids?.length
      ? ids.map((storeId) => (
          <WelcomeTableRow key={storeId} storeId={storeId} />
        ))
      : null;

    content = (
      <section className="container mt-5 bg-light table-component py-5">
        <div className="row bg-white px-0 mx-0 py-3 table-row-style align-items-items">
          <div className="col-1" />
          <div className="col fw-bold">ID</div>
          <div className="col fw-bold">Address</div>
          <div className="col fw-bold">City</div>
          <div className="col fw-bold">Postal Code</div>
          <div className="col fw-bold">View</div>
          <div className="col fw-bold">Edit</div>
          <div className="col-1" />
        </div>
        {tableContent}
      </section>
    );
  } else return null;
  return content;
};

export default WelcomeTable;
