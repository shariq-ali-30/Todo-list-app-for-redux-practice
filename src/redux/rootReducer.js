import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "../features/TodoSlice";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default rootReducer;
