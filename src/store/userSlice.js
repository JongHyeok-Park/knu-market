import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        let newState = {
          name: action.payload.name
        }
        return newState
      }
      return null
    }
  }
});

export let { setUser } = user.actions;

export default user;