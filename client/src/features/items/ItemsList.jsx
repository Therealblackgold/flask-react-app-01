import React from "react";
import Item from "./Item";
import { useGetItemsQuery } from "./itemsApiSlice";

const ItemsList = () => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery("itemsList", {
    // Extra fields that refetch data at certain intervals
    pollingInterval: 60000,
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
    // destructuring ids from items data
    const { ids } = items;

    // console.log(`ITEMS: ${ids}`);

    // making sure we have ids.length before mapping
    const tableContent = ids.length
      ? ids.map((itemId) => <Item key={itemId} itemId={itemId} />)
      : null;

    content = (
      <>
        <table className="table table--items">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th item__edit">
                item_code
              </th>
              <th scope="col" className="table__th item__itemname">
                id
              </th>
              <th scope="col" className="table__th item__roles">
                cost
              </th>

              <th scope="col" className="table__th item__edit">
                price
              </th>
              <th scope="col" className="table__th item__edit">
                store_id
              </th>
              <th scope="col" className="table__th item__edit">
                user_id
              </th>
              <th scope="col" className="table__th item__edit">
                Description
              </th>
              <th scope="col" className="table__th item__edit">
                Update
              </th>
              <th scope="col" className="table__th item__edit">
                View
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }
  return content;
};

export default ItemsList;
