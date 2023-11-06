import { setAuthData } from "../state/auth/authSlice";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useCreateUserMutation } from "../state/api/api";
import { closeToaster, openToaster } from "../state/toaster/toasterSlice";
import { toast } from "react-toastify";

type FormValues = {
  username: string;
  password: string;
};

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const toasterData = useSelector((state: RootState) => state.toaster);

  useEffect(() => {
    if (toasterData.open) {
      switch (toasterData.type) {
        case "info":
          toast.info(toasterData.text, {
            onClose: () => dispatch(closeToaster()),
          });
          break;
        case "success":
          toast.success(toasterData.text, {
            onClose: () => dispatch(closeToaster()),
          });
          break;
        case "warning":
          toast.warning(toasterData.text, {
            onClose: () => dispatch(closeToaster()),
          });
          break;
        case "error":
          toast.error(toasterData.text, {
            onClose: () => dispatch(closeToaster()),
          });
      }
    }
  }, [dispatch, toasterData]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please, provide your username."),
    password: Yup.string().required("Please, provide your password."),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit } = useForm<FormValues>(formOptions);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const authData = await createUser(data);
      dispatch(setAuthData(authData));
      navigate("/operations");
      dispatch(
        openToaster({
          type: "success",
          text: "Account created successfully.",
        })
      );
    } catch (error: any) {
      console.error(error);
      const errorCode = error?.response?.data?.message;
      if (
        errorCode.includes("duplicate key value violates unique constraint")
      ) {
        dispatch(
          openToaster({
            type: "error",
            text: "Duplicate email account.",
          })
        );
      } else {
        dispatch(
          openToaster({
            type: "error",
            text: "Error when creating account.",
          })
        );
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-evenly items-center">
        <div className="m-auto flex flex-col justify-evenly items-center border border-gray-300 rounded-md">
          <div className="m-3 flex flex-col justify-evenly items-center">
            <div className="font-bold text-2xl m-2">Create Account</div>
            <div className="w-full">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter your Username"
                  {...register("username")}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  {...register("password")}
                />
              </div>

              <div className="w-full py-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="btn"
                >
                  Continue
                </button>
              </div>
            </div>
            <div className="text-xs mt-8">
              Do you have an account?{" "}
              <a href="/signin" className="text-blue-600">
                Sing In
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
