import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    imagePath: null,
    starScore: null
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.imagePath = action.payload.imagePath
      state.starScore = action.payload.starScore
    }
  }
});

export let { setUser } = user.actions;

export default user;