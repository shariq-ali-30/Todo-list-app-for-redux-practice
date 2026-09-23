import { configureStore } from "@reduxjs/toolkit";
import TodosReducer from "../features/TodoSlice";

export const store = configureStore({
  reducer: {
    todoSlice: TodosReducer,
  },
});
