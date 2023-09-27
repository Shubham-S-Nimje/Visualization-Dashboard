import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export const { setData, setStatus, setError } = dataSlice.actions;
export default store;
