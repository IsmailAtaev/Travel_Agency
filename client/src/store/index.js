import { configureStore } from "@reduxjs/toolkit";
import tourReducer from "./tourStore/tourSlice";
import userReducer from "./user/userStore";
import customerReducer from "./customerStore/customerSlice";

export default configureStore({
  reducer: {
    tour: tourReducer,
    user: userReducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
