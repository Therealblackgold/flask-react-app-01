import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;

    const token = localStorage.getItem("user");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "http://localhost:5000");
    }
    return headers;
  },
});

// BaseQueryWithReAuth will be used to get a refresh token
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  // getting result/access token from baseQuery function above
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access
    // args here is a new route "/auth/refresh"
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }

  // result that returns token if nothing goes wrong
  return result;
};

export const apiSlice = createApi({
  //API baseUrl
  baseQuery: baseQueryWithReAuth,
  // baseQuery,
  //NB: tagTypes will be used to invalidate cashed data
  tagTypes: ["Note", "User", "Item"],
  endpoints: (builder) => ({}),
});
