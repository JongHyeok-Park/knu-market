import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    name: 'Lee siuen'
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.name = action.payload.name
      }
      state.name = 'Lee sieun'
    }
  }
});

export let { setUser } = user.actions;

export default user;