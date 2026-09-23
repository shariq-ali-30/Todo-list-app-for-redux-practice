import { createSlice } from "@reduxjs/toolkit";

const initialState = { todos: [] };

export const TodoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const {  } = TodoSlice.actions;

export default TodoSlice.reducer;
