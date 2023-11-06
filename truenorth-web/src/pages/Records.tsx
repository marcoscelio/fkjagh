import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import RecordsTable from "./RecordsTable";
import { AppDispatch } from "../state/store";
import { useDispatch } from "react-redux";
import { openToaster } from "../state/toaster/toasterSlice";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const LIMIT = 10;

type FormValues = {
  goToPage: number;
};

type FilterFormValues = {
  filter: string;
  sort: string;
};

interface PaginationOptions {
  currentPage: number;
  offset: number;
  limit: number;
  filter?: string;
  sort?: string;
}

const Records = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [total, setTotal] = useState<number>();
  const [numberOfPages, setNumberOfPages] = useState<number>();

  const validationSchema = Yup.object().shape({
    goToPage: Yup.number()
      .positive()
      .required("Please, provide a positive number for page."),
    filter: Yup.string(),
    sort: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const filterValidationSchema = Yup.object().shape({
    filter: Yup.string(),
    sort: Yup.string(),
  });
  const filterFormOptions = { resolver: yupResolver(filterValidationSchema) };

  const { register: filterRegister, handleSubmit: handleFilterSubmit } =
    useForm<FilterFormValues>(filterFormOptions);

  const [pagination, setPagination] = useState<PaginationOptions>({
    offset: 0,
    limit: LIMIT,
    currentPage: 0,
  });
  const navigate = useNavigate();

  const next = (page: number) => {
    const offset = !page ? page : LIMIT * page;
    const paginate = !total ? true : page * LIMIT < total;
    if (paginate) {
      setPagination({
        ...pagination,
        offset,
        currentPage: page,
      });
    } else {
      dispatch(
        openToaster({
          type: "error",
          text: "Not able to go further.",
        })
      );
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    next(data.goToPage - 1);
  };

  const onFilter: SubmitHandler<FilterFormValues> = async ({
    filter,
    sort,
  }) => {
    setPagination({
      ...pagination,
      offset: 0,
      currentPage: 0,
      filter,
      sort,
    });
  };

  useEffect(() => {
    if (total) {
      const numberOfPages = Math.round(total / 10) + 1;
      setNumberOfPages(numberOfPages);
    }
  }, [total]);

  if (errors?.goToPage?.message) {
    dispatch(
      openToaster({
        type: "error",
        text: "Please, provide a valid positive number for page.",
      })
    );
  }

  return useMemo(
    () => (
      <>
        <div className="m-3 flex flex-col justify-evenly items-center w-full">
          <div id="classes_panel" className="">
            <div className="m-2 flex items-center justify-center gap-4 w-full">
              <div className="text-xl">Records</div>
              <div className="btn" onClick={() => navigate("/operations")}>
                <div>
                  <BsPlusCircle />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-start justify-center">
                <div>Filter</div>
                <div className="flex items-center justify-center w-full ">
                  <input
                    type="string"
                    className="input border border-gray-300 w-24"
                    {...filterRegister("filter")}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-center">
                <div>Sort</div>
                <div className="flex items-center justify-center w-full border border-gray-300 rounded-md">
                  <select
                    className="m-3 border-spacing-0"
                    {...filterRegister("sort")}
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="user">User</option>
                    <option value="operation">Operation</option>
                  </select>
                </div>
              </div>
              <div className="btn mt-5" onClick={handleFilterSubmit(onFilter)}>
                <FaSearch />
              </div>
            </div>
            <div className="w-full">
              <div className="h-[40rem] w-full">
                <RecordsTable
                  key="table"
                  offset={pagination.offset}
                  limit={pagination.limit}
                  filter={pagination.filter || ""}
                  sort={pagination.sort || ""}
                  total={setTotal}
                />
              </div>

              <div className="flex gap-3 w-full">
                <div className="px-5 join flex items-center justify-center w-full">
                  {total &&
                    Array(numberOfPages)
                      .fill(0)
                      .map((_, i) => {
                        return (
                          <button
                            key={i}
                            className={`join-item btn ${
                              pagination.currentPage === i ? "btn-active" : ""
                            }`}
                            onClick={() => next(i)}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                </div>
                <div className="flex items-center justify-center w-full">
                  <input
                    type="number"
                    className="m-3 input border border-gray-300 w-24"
                    {...register("goToPage")}
                  />
                  <button
                    className="join-item btn"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Go to Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    [pagination, numberOfPages]
  );
};

export default Records;
