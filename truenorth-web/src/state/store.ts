import { AnyAction, Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { authSlice } from "./auth/authSlice";
import { toasterSlice } from "./toaster/toasterSlice";
import { api } from "./api/api";

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_REDUX_SECRET_KEY,
  onError(error) {
    console.log("Error on redux encryptor:", error);
  },
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [encryptor],
};

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice.reducer,
  toaster: toasterSlice.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "auth/logout") {
    const {
      rememberEmail,
      user: { email },
    } = state.auth.data;

    storage.removeItem("persist:root");

    state = (
      rememberEmail
        ? { auth: { data: { rememberEmail, user: { email } } } }
        : {}
    ) as RootState;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
