import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { logout } from "../state/auth/authSlice";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { ToasterContainer } from "../styled/toasterStyle";
import { closeToaster } from "../state/toaster/toasterSlice";
import { toast } from "react-toastify";
import { api as api, useVerifyTokenQuery } from "../state/api/api";
import { FiLogOut } from "react-icons/fi";

interface TemplateProps {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const toasterData = useSelector((state: RootState) => state.toaster);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: authData, isError, isLoading } = useVerifyTokenQuery();
  const locationUrl = location.pathname + location.search;
  const redirectUrl = locationUrl !== "/" && encodeURIComponent(locationUrl);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(api.util.resetApiState());
    navigate("/signin");
  }, [dispatch, navigate]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="absolute right-1/2 h-screen">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  if (!authData?.accessToken || isError) {
    return (
      <Navigate
        to={redirectUrl ? `/signin?redirect=${redirectUrl}` : "/signin"}
        state={{ from: location }}
        replace
      />
    );
  }
  return (
    <div id="container" className="flex">
      <nav
        className="absolute z-50 flex items-center justify-between flex-wrap bg-teal-500 p-3 w-full"
        ref={menuRef}
      >
        <div className="sm:pl-[34%] flex items-center flex-shrink-0 text-white mr-6">
          <div className="flex h-12 w-full justify-center items-center">
            Calculator App
          </div>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded 
            text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full ${
            menuOpen ? "block" : "hidden"
          } flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            <a
              href="/operations"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Operations
            </a>

            <a
              href={`/records`}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Records
            </a>
            <a
              onClick={handleLogout}
              href="#responsive-header"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              <FiLogOut size={15} />
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-24 flex justify-center items-center w-full">
        <div className="flex sm:items-center sm:justify-center w-full">
          {children}

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
        </div>
      </div>
    </div>
  );
};

export default Template;
