import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  bookingTour,
  getReservationTour,
  getValidateCardId,
  reservationTour,
  cancelBookingTourApi,
} from "../../http";

export const buyTour = createAsyncThunk(
  "customers/buyTour",
  async (customerInfo, { rejectWithValue, dispatch }) => {
    const { data } = await bookingTour({ clientInfoBooking: customerInfo });
  }
);

export const getValidateCard = createAsyncThunk(
  "customers/getValidateCard",
  async (email, { rejectWithValue, dispatch }) => {
    const { data } = await getValidateCardId({ email: email });
  }
);

export const bookingTourSlice = createAsyncThunk(
  "customers/bookingTourSlice",
  async (objectBooking, { rejectWithValue, dispatch }) => {
    const { data } = await reservationTour({ objectBooking: objectBooking });
  }
);

export const getBookingUser = createAsyncThunk(
  "customers/getBookingUser",
  async (user, { rejectWithValue, dispatch }) => {
    //console.log("user slice ", user);
    const data = await getReservationTour(JSON.stringify(user));
    //console.log("getBookingUser1 ", data);
    dispatch(setBookingUser({ booking: data }));
  }
);

export const cancelBookingTour = createAsyncThunk(
  "customers/cancelBookingTour",
  async (obj, { rejectWithValue, dispatch }) => {
    const { data } = await cancelBookingTourApi({ cancelTourObj: obj });
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    mainClient: {},
    tour: {},
    booking: {},
  },
  reducers: {
    addCustomer(state, action) {
      state.customers.push({
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        gender: action.payload.gender,
        birthDate: action.payload.birthDate,
        citizenship: action.payload.citizenship,
        passportSeriesAndNumber: action.payload.passportSeriesAndNumber,
        dateOfPassport: action.payload.dateOfPassport,
        validityPeriod: action.payload.validityPeriod,
      });
    },

    addMainClient(state, action) {
      state.mainClient = action.payload.mainClient;
    },

    addTour(state, action) {
      state.tour = action.payload.tour;
    },

    setBookingUser(state, action) {
      state.booking = action.payload.booking;
    },
  },
  extraReducers: {
    [buyTour.fulfilled]: () => console.log(),
    [buyTour.pending]: () => console.log(""),
    [buyTour.rejected]: () => console.log(""),
  },
});

export const { addCustomer, addMainClient, addTour, setBookingUser } =
  customerSlice.actions;

export default customerSlice.reducer;
