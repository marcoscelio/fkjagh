
import { Pagination } from "../../types/pagination";
import { AddRecord, RecordResponse } from "../../types/record";
import { TNBuilder } from "../customFetchBase";

export const recordEndpoints = (builder: TNBuilder) => ({
  findRecords: builder.query<RecordResponse, Pagination>({
    query: (pagination: Pagination) => ({
      url: `v1/records?offset=${pagination.offset}&limit=${pagination.limit}&q=${pagination.filter}&sort=${pagination.sort}`,
      method: "GET",
      credentials: "include",
    }),
    providesTags: ['Record'],
  }),
  deleteRecord: builder.mutation<void, string>({
    query: (id: string) => ({
      url: `v1/records/${id}`,
      method: "DELETE",
      credentials: "include",
    }),
    invalidatesTags: ['Record'],
  }),
  addRecord: builder.mutation<RecordResponse, AddRecord>({
    query: (record: AddRecord) => ({
      url: `v1/records`,
      method: "POST",
      body: record,
      formData: true,
    }),
    invalidatesTags: ['Record'],
  })

})
