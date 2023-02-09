import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// creating entity adapter to get normalized state
const usersAdapter = createEntityAdapter({});

// getting initialState
const initialState = usersAdapter.getInitialState();

// creating endpoints usersApiSlice and injecting them to the apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // NB GET ALL USERS
    getUsers: builder.query({
      // query is the url excluding the base query defined in the apiSlice
      query: () => "/get-users",
      // validating the response status and making sure there is not an isError
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //NB transformResponse helps change user.id to user._id when working with mongoDB
      transformResponse: (responseData) => {
        const data = responseData.users;
        console.log(data);

        const loadedUsers = data.map((user) => {
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            // including ids list so it can be invalidated when theres changes
            { type: "User", id: "LIST" },
            //!NB mapping over ids so they can also be invalidated one by one when theres changes
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    // ADD NEW USER
    addNewUser: builder.mutation({
      // passing initialUserData to be added
      query: (initialUserData) => ({
        url: "/add-user",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      // update cache by invalidating user list
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    // NB UPDATE USER
    updateUser: builder.mutation({
      // passing initialUserData to be updated
      query: (initialUserData) => ({
        url: `/update-user/${initialUserData.id}`,
        method: "PUT",
        body: {
          ...initialUserData,
        },
      }),
      // update cache by invalidating user id
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    // NB DELETE USER
    deleteUser: builder.mutation({
      // destructuring the user id
      query: ({ id }) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
        body: { id },
      }),
      // update cache by invalidating user id
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

//NB exporting renamed methods
export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename the with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
