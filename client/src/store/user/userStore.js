import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registrationApi,
  loginApi,
  buyTourValidUser,
  getTicketValidUser,
} from "../../http/index";

export const registration = createAsyncThunk(
  "user/registration",
  async (userData, { rejectWithValue, dispatch }) => {
    console.log("qqq: ", userData);
    const { email, password, role, nickName } = userData;
    const { data } = await registrationApi(email, password, role, nickName);
    console.log("data: ", data);
    dispatch(setUser(data));
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, dispatch }) => {
    const { email, password, nickName } = userData;
    const { data } = await loginApi(email, password, nickName);
    dispatch(setUser(data));
  }
);

export const buyTourValidationUser = createAsyncThunk(
  "user/buyTourValidationUser",
  async (bookingInfoUser, { rejectWithValue, dispatch }) => {
    // console.log("27", bookingInfoUser);
    const { data } = await buyTourValidUser({ bookingInfoUser });
  }
);

export const getTicketUser = createAsyncThunk(
  "user/getTicketUser",
  async (ticketObj, { rejectWithValue, dispatch }) => {
    const data = await getTicketValidUser(JSON.stringify(ticketObj));
    console.log("ticket: ", data);
    dispatch(setTicketValidUser(data));
    //return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      email: "",
      id: "",
      isActivated: "",
      role: "",
      nickName: "",
    },
    ticket: [],
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setTicketValidUser(state, action) {
      state.ticket = action.payload;
    },
  },

  extraReducers: {
    [registration.fulfilled]: () => console.log("fulfilled"),
    [registration.pending]: () => console.log("pending"),
    [registration.rejected]: () => console.log("rejected"),
  },
});

export const { setUser, setTicketValidUser } = userSlice.actions;

export default userSlice.reducer;
