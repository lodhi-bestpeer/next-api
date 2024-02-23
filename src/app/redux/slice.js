import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiData: [],
  user: [],
};

export const fetchDummyData = createAsyncThunk("fetchDummyData", async () => {
  let data = await fetch("https://jsonplaceholder.typicode.com/users/");
  data = await data.json();
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      return { ...state, user: [...state.user, payload] };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDummyData.fulfilled, (state, actions) => {
      state.apiData = actions.payload;
    });
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
