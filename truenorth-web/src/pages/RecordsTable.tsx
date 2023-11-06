import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useDeleteRecordMutation, useFindRecordsQuery } from "../state/api/api";
import { openToaster } from "../state/toaster/toasterSlice";
import { BsFillTrash3Fill } from "react-icons/bs";
import { Record } from "../types/record";

interface PaginationOptions {
  offset: number;
  limit: number;
  filter: string;
  sort: string;
  total: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const RecordsTable = ({
  offset,
  limit,
  filter,
  sort,
  total,
}: PaginationOptions) => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteRecord] = useDeleteRecordMutation();

  const { data: recordsResponse, isLoading } = useFindRecordsQuery({
    offset,
    limit,
    filter,
    sort,
  });

  useEffect(() => {
    if (recordsResponse) {
      total(recordsResponse.total);
    }
  }, [recordsResponse]);

  const handleDeleteRecord = useCallback(async (id: string) => {
    await deleteRecord(id);
    dispatch(
      openToaster({
        type: "success",
        text: "Record deleted successfully.",
      })
    );
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute right-1/2 h-screen">
          <span className="loading loading-spinner text-success"></span>
        </div>
      )}
      <div className="m-3 flex flex-col justify-evenly items-center w-full">
        <div id="classes_panel" className="overflow-x-auto h-[40rem]">
          <table className="table table-lg">
            {/* head */}
            <thead>
              <tr>
                <th>Type</th>
                <th>Cost</th>
                <th>User</th>
                <th>Balance</th>
                <th>Operation Response</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {!!recordsResponse?.result?.length &&
                recordsResponse?.result?.map((record: Record) => {
                  return (
                    <tr
                      key={`${record.id}`}
                      className="hover:bg-gray-100 hover:cursor-pointer"
                    >
                      <td>
                        <div className="flex items-center space-x-3">
                          {record.operation.type}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          {record.amount}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          {record.user.username}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          {record.userBalance}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          {record.operationResponse}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            record?.id && handleDeleteRecord(record.id);
                          }}
                        >
                          <BsFillTrash3Fill />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecordsTable;
