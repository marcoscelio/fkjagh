import { AuthData } from "../../types/AuthData";
import { User, UserResponse } from "../../types/User";
import { TNBuilder } from "../customFetchBase";

export const userEndpoints = (builder: TNBuilder) => ({
  login: builder.mutation<AuthData, { username: string; password: string }>({
    query: (data: { username: string; password: string }) => ({
      url: `users/login`,
      method: "POST",
      body: data,
      credentials: "omit",
    }),
    invalidatesTags: ["User"],
  }),
  verifyToken: builder.query<AuthData, void>({
    query: () => ({
      url: `users/security/verify`,
      method: "GET",
      credentials: "include",
    }),
  }),
  createUser: builder.mutation<UserResponse, User>({
    query: (user: User) => ({
      url: `/users/register`,
      method: "POST",
      body: {
        username: user.username,
        password: user.password
      },
      credentials: "omit",
    }),
    invalidatesTags: ["User"]
  }),
});
