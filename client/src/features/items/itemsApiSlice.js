import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// creating entity adapter to get normalized state
const itemsAdapter = createEntityAdapter({});

// getting initialState
const initialState = itemsAdapter.getInitialState();

// creating endpoints itemsApiSlice and injecting them to the apiSlice
export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // NB GET ALL ITEMS
    getItems: builder.query({
      // query is the url excluding the base query defined in the apiSlice
      query: () => "/get-items",
      // validating the response status and making sure there is not an isError
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //NB transformResponse helps change item.id to item._id when working with mongoDB
      transformResponse: (responseData) => {
        const data = responseData.inventory;
        console.log(data);
        // console.log(responseData);
        const loadedItems = data.map((item) => {
          return item;
        });
        return itemsAdapter.setAll(initialState, loadedItems);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            // including ids list so it can be invalidated when theres changes
            { type: "Item", id: "LIST" },
            //!NB mapping over ids so they can also be invalidated one by one when theres changes
            ...result.ids.map((id) => ({ type: "Item", id })),
          ];
        } else return [{ type: "Item", id: "LIST" }];
      },
    }),
    // ADD NEW ITEM
    addNewItem: builder.mutation({
      // passing initialItemData to be added
      query: (initialItemData) => ({
        url: `/add-item`,
        method: "POST",
        body: {
          ...initialItemData,
        },
      }),
      // update cache by invalidating item list
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
    // NB UPDATE ITEM
    updateItem: builder.mutation({
      // passing initialItemData to be updated
      query: (initialItemData) => ({
        url: `/update-item/${initialItemData.id}`,
        method: "PATCH",
        body: {
          ...initialItemData,
        },
      }),
      // update cache by invalidating item id
      invalidatesTags: (result, error, arg) => [{ type: "Item", id: arg.id }],
    }),
    // NB DELETE ITEM
    deleteItem: builder.mutation({
      // destructuring the item id
      query: ({ id }) => ({
        url: `/delete-item/${id}`,
        method: "DELETE",
        body: { id },
      }),
      // update cache by invalidating item id
      invalidatesTags: (result, error, arg) => [{ type: "Item", id: arg.id }],
    }),
  }),
});

//NB exporting renamed methods
export const {
  useGetItemsQuery,
  useAddNewItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApiSlice;

// returns the query result object
export const selectItemsResult = itemsApiSlice.endpoints.getItems.select();

// creates memoized selector
const selectItemsData = createSelector(
  selectItemsResult,
  (itemsResult) => itemsResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename the with aliases using destructuring
export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemIds,
  // pass in a selector that returns the items slice of state
} = itemsAdapter.getSelectors(
  (state) => selectItemsData(state) ?? initialState
);
