import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query";

import { logout } from "./auth/authSlice";
import { AuthState } from "./auth/types";

export const TAG_TYPES = ["Operation", "Record", "User"] as const;

export type TagTypes = (typeof TAG_TYPES)[number];

export type TNBuilder = EndpointBuilder<
    typeof customFetchBase,
    TagTypes,
    "api"
>;

const baseUrl = import.meta.env.VITE_TN_API;

const PUBLIC_ENDPOINTS = ["login", "createUser"];

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint, ...rest }) => {
        if (!PUBLIC_ENDPOINTS.includes(endpoint)) {
            // By default, if we have a token in the store, let's use that for authenticated requests
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const token = ((getState() as any).auth as AuthState).authData?.accessToken;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            } else {
                throw {
                    status: "CUSTOM_ERROR",
                    error: "Endpoint requires authentication.",
                    data: { endpoint, ...rest },
                };
            }
        }
        return headers;
    },
});

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    try {
        let result = await baseQuery(args, api, extraOptions);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((result.error?.data as any)?.statusCode === 403) {
            const refreshResult = await baseQuery(
                { credentials: "include", url: "users/secutity/verify" },
                api,
                extraOptions,
            );
            if (refreshResult.data) {
                // Retry the initial query
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
                window.location.href = "/signin";
            }
        }
        return result;
    } catch (error) {
        return {
            error: error as FetchBaseQueryError,
        };
    }
};

export default customFetchBase;
