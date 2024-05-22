import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    name: null,
    imagePath: null,
    starScore: null
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name
      state.imagePath = action.payload.imagePath
      state.starScore = action.payload.starScore
    }
  }
});

export let { setUser } = user.actions;

export default user;