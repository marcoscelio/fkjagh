import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { setAuthData } from "../state/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { ToasterContainer } from "../styled/toasterStyle";
import { useLoginMutation } from "../state/api/api";
import { closeToaster, openToaster } from "../state/toaster/toasterSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

type FormValues = {
  username: string;
  password: string;
};

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(formOptions);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await login(data);
      if ("error" in result) {
        dispatch(
          openToaster({
            type: "error",
            text: "Login error. Please try again.",
          })
        );
      }
      if ("data" in result) {
        const authData = result.data;
        dispatch(setAuthData(authData));
        navigate("/operations");
      }
    } catch (error) {
      console.error(error);
      dispatch(
        openToaster({
          type: "error",
          text: "Login error. Please try again.",
        })
      );
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen gap-4">
        <div className="flex items-center justify-center">
          <div className="ml-2 font-bold text-cyan-700">Calculator</div>
        </div>

        <div className="flex flex-col gap-2">
          <input
            className={`input input-bordered w-80 ${
              errors.username?.message ? "border border-red-400" : ""
            }`}
            id="email"
            type="text"
            placeholder="Provide your username"
            {...register("username")}
          />
          <input
            className={`input input-bordered w-full ${
              errors.password?.message ? "border border-red-400" : ""
            }`}
            id="password"
            type="password"
            placeholder="Provide your password"
            {...register("password")}
          />
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="btn"
          >
            Continue
          </button>{" "}
          or{" "}
          <a href="/signup" className="link">
            Sign Up
          </a>
        </div>
      </div>

      <ToasterContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Signin;
