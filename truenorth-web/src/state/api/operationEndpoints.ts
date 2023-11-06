

import { OperationResponse } from "../../types/operation";
import { TNBuilder } from "../customFetchBase";

export const operationEndpoints = (builder: TNBuilder) => ({
  getOperations: builder.query<OperationResponse[], void>({
    query: () => ({
      url: `operations`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ['Operation'],
  }),

})
