import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { openToaster } from "../state/toaster/toasterSlice";
import Select from "react-select";
import { OperationResponse } from "../types/operation";
import { useAddRecordMutation, useGetOperationsQuery } from "../state/api/api";
import { useNavigate } from "react-router-dom";

type FormValues = {
  operationType: string;
  amount: number;
};

const Operations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data: operations, isLoading: operationsIsLoading } =
    useGetOperationsQuery();
  const [addRecord] = useAddRecordMutation();

  const validationSchema = Yup.object().shape({
    operationType: Yup.string().required("Please, provide the operation type."),
    amount: Yup.number().required("Please, provide the amount."),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const handleSelectOperation = (item: any) => {
    if (item) {
      setValue("operationType", item);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await addRecord({
        operationType: data.operationType,
        amount: data.amount,
      });

      if ("error" in result) {
        dispatch(
          openToaster({
            type: "error",
            text: "Error when adding record. Please, try again.",
          })
        );
        return;
      }
      if ("data" in result) {
        dispatch(
          openToaster({
            type: "success",
            text: `Record added successfully`,
          })
        );
        navigate("/records");
      }
    } catch (error: any) {
      console.error(error);
      dispatch(
        openToaster({
          type: "error",
          text: "Unexpected error. Please, try again.",
        })
      );
    }
  };

  const buildOperations = useCallback(
    (operations: OperationResponse[]) => {
      return operations?.map((operation) => ({
        label: operation.type,
        value: operation.id,
      }));
    },
    [operations]
  );

  return (
    <>
      <div className="m-3 flex flex-col justify-evenly items-center w-1/2">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="ml-2 font-bold text-cyan-700">Operations</div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Operation Type
              </label>

              {operationsIsLoading && (
                <div className="absolute right-1/2 h-screen">
                  <span className="loading loading-spinner text-success"></span>
                </div>
              )}

              {operations && (
                <Select
                  closeMenuOnSelect={false}
                  options={buildOperations(operations)}
                  onChange={(item) => handleSelectOperation(item?.value)}
                  placeholder="Selecione as aulas que o cliente terá acesso."
                />
              )}
              <div className="h-2">
                {errors?.operationType && (
                  <p className="text-red-500 text-xs italic">
                    {errors.operationType.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full py-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="cost"
              >
                Amount
              </label>
              <input
                className={`input input-bordered w-full ${
                  errors.amount?.message ? "border border-red-400" : ""
                }`}
                id="cost"
                type="number"
                placeholder="Provide the operation cost."
                {...register("amount")}
              />
            </div>
            <div className="h-2">
              {errors?.amount && (
                <p className="text-red-500 text-xs italic">
                  {errors.amount.message}
                </p>
              )}
            </div>
            <div className="mt-8">
              <button onClick={handleSubmit(onSubmit)} className="btn">
                Execute
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Operations;
