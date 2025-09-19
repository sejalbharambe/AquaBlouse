import { configureStore } from "@reduxjs/toolkit";
import DesignReducer from "../Redux/Slices/DesignSlice";

const store = configureStore({
  reducer: {
    design: DesignReducer,
  },
});

export default store;
