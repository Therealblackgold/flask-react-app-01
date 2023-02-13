import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

//extending apiSlice
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //NB LOGIN USER
    login: builder.mutation({
      //passing credentials which are the username and password
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        // spreading credentials object
        body: { ...credentials },
      }),
    }),
    //NB SEND LOGOUT
    sendLogout: builder.mutation({
      query: (credentials) => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // using onQueryStarted to get access to dispatch inside endpoint
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          //logOut sets token to null
          dispatch(logOut());
          setTimeout(() => {
            // resetting apiSlice inside a setTimeout to delay before execution
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    // REFRESH TOKEN
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),
      // just like the logout we just send a request to the backend end point so just need to make sure its fulfilled.
      // using RTK QUERY onQueryStarted function to dispatch and verify the query has been fulfilled
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // destructuring the accessToken
          const { accessToken } = data;

          // const { accessToken } = data;
          //!NB this use of dispatch will setCredentials instead of importing dispatch on every component that uses the useRefreshMutation
          dispatch(setCredentials({ accessToken }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
