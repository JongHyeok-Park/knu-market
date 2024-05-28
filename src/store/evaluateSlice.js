import { createSlice } from "@reduxjs/toolkit";

let evaluate = createSlice({
  name: "evaluate",
  initialState: {
    id: null,
    name: null
  },
  reducers: {
    setEval: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    }
  }
});

export let { setEval } = evaluate.actions;

export default evaluate;