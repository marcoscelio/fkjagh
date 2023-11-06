import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./state/store";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Template from "./components/Template";
import Signin from "./pages/SignIn";
import Records from "./pages/Records";
import Operations from "./pages/Operations";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/signin/:route?" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/operations"
            element={
              <Template>
                <Operations />
              </Template>
            }
          />
          <Route
            path="/records"
            element={
              <Template>
                <Records />
              </Template>
            }
          />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
