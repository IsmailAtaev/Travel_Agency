import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $host, createTour, removeTour } from "../../http";

export const getTours = createAsyncThunk(
  "tours/getTours",
  async (_, { rejectWithValue, dispatch }) => {
    const { data } = await $host.get("/tour");
    dispatch(setTours(data));
  }
);

export const getUsers = createAsyncThunk(
  "tours/getUsers",
  async (_, { rejectWithValue, dispatch }) => {
    const { data } = await $host.get("/api/get/users");
    dispatch(setUsers(data));
  }
);

export const sentCreateTour = createAsyncThunk(
  "tours/sentCreateTour",
  async (tour, { rejectWithValue, dispatch }) => {
    const { data } = await createTour(tour);
    dispatch(addTour(tour));
  }
);

export const deleteTourItem = createAsyncThunk(
  "tours/deleteTourItem",
  async (tourId, { rejectWithValue, dispatch }) => {
    const { id } = tourId;
    const { deletedTour } = await removeTour(id);
  }
);

const tourSlice = createSlice({
  name: "tours",
  initialState: { tours: [], users: [], reservations: [] },
  reducers: {
    setTours: (state, action) => {
      state.tours = action.payload;
    },

    addTour(state, action) {
      console.log("slice ", state);
      console.log("slice ", action);

      state.tours.push({
        name: action.payload.name,
        type: action.payload.type,
        date: action.payload.date,
        country: action.payload.country,
        city: action.payload.city,
        price: action.payload.price,
        duration: action.payload.duration,
        linkPhoto: action.payload.duration,
      });
    },

    setUsers(state, action) {
      state.users = action.payload;
    },
  },
  extraReducers: {
    [getTours.fulfilled]: () => console.log(),
    [getTours.pending]: () => console.log(""),
    [getTours.rejected]: () => console.log(""),
  },
});

export const { addTour, setTours, setUsers } = tourSlice.actions;

export default tourSlice.reducer;
