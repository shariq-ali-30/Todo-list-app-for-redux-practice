import { createSlice } from "@reduxjs/toolkit";

const initialState = { todos: [] };

export const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      let findTodo = state.todos.find((todo) => todo.id == action.payload.id);

      findTodo.title = action.payload.title;
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
