import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

const storesAdapter = createEntityAdapter({});

const initialState = storesAdapter.getInitialState();

// creating endpoints storesApiSlice and injecting them to the apiSlice
export const storesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      // query is the url excluding the base query defined in the apiSlice
      query: () => "/get-stores",
      // validating the response status and isError
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //NB transformResponse helps change store.id to store._id when working with mongoDB
      transformResponse: (responseData) => {
        const data = responseData.stores;
        console.log(data);
        console.log(responseData);
        const loadedStores = data.map((store) => {
          // store.createdAt = "2 Dec 2023";
          return store;
        });
        return storesAdapter.setAll(initialState, loadedStores);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Store", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Store", id })),
          ];
        } else return [{ type: "Store", id: "LIST" }];
      },
    }),
    // ADD NEW STORE
    addNewStore: builder.mutation({
      // passing initialStore to be added
      query: (initialStore) => ({
        url: `/add-store`,
        method: "POST",
        body: {
          ...initialStore,
        },
      }),
      // update cache by invalidating store list
      invalidatesTags: [{ type: "Store", id: "LIST" }],
    }),
    // NB UPDATE STORE
    updateStore: builder.mutation({
      // passing initialStore to be updated
      query: (initialStore) => ({
        url: `/update-store/${initialStore.id}`,
        method: "PUT",
        body: {
          ...initialStore,
        },
      }),
      // update cache by invalidating store id
      invalidatesTags: (result, error, arg) => [{ type: "Store", id: arg.id }],
    }),
    // NB DELETE STORE
    deleteStore: builder.mutation({
      // destructuring the store id
      query: ({ id }) => ({
        url: `/delete-stores/${id}`,
        method: "DELETE",
        body: { id },
      }),
      // update cache by invalidating store id
      invalidatesTags: (result, error, arg) => [{ type: "Store", id: arg.id }],
    }),
  }),
});

//NB exporting renamed methods
export const {
  useGetStoresQuery,
  useAddNewStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storesApiSlice;

// returns the query result object
export const selectStoresResult = storesApiSlice.endpoints.getStores.select();

// creates memoized selector
const selectStoresData = createSelector(
  selectStoresResult,
  (storesResult) => storesResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename the with aliases using destructuring
export const {
  selectAll: selectAllStores,
  selectById: selectStoreById,
  selectIds: selectStoreIds,
  // pass in a selector that returns the stores slice of state
} = storesAdapter.getSelectors(
  (state) => selectStoresData(state) ?? initialState
);
