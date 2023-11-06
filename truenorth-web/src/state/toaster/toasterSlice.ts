import { createSlice } from "@reduxjs/toolkit";

import { ToasterState } from "./types";

const initialState: ToasterState = { open: false, text: "", type: "info" };

export const toasterSlice = createSlice({
  name: "toaster",
  initialState: initialState,
  reducers: {
    openToaster: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.text = action.payload.text;
    },
    closeToaster: (state) => {
      state.open = false;
      state.text = "";
    },
  },
});

export const { openToaster, closeToaster } = toasterSlice.actions;
