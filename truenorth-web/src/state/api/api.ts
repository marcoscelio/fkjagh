import { createApi } from "@reduxjs/toolkit/query/react";

import customFetchBase, { TAG_TYPES } from "../customFetchBase";

import { operationEndpoints } from "./operationEndpoints";
import { userEndpoints } from "./userEndpoints";
import { recordEndpoints } from "./recordEndpoints";

export const api = createApi({
  reducerPath: "api",
  baseQuery: customFetchBase,
  refetchOnReconnect: true,
  tagTypes: TAG_TYPES,
  endpoints: (builder) => ({
    ...operationEndpoints(builder),
    ...userEndpoints(builder),
    ...recordEndpoints(builder),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useVerifyTokenQuery,
  useFindRecordsQuery,
  useDeleteRecordMutation,
  useAddRecordMutation,
  useGetOperationsQuery,
} = api;
