import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addTodo, deleteTodo, editTodo } from "./features/TodoSlice";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");
  const errorTimeout = useRef(null);
  const inputRef = useRef();

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [todoToEdit, settodoToEdit] = useState(null);

  const showError = () => {
    setError("Please enter a task before adding it.");

    if (errorTimeout.current) {
      clearTimeout(errorTimeout.current);
    }

    errorTimeout.current = setTimeout(() => {
      setError("");
    }, 3000);
  };

  const addTodoFn = (e) => {
    e.preventDefault();

    if (!inputVal.trim()) {
      inputRef.current.focus();
      showError();
      return;
    }

    if (todoToEdit) {
      dispatch(
        editTodo({
          id: todoToEdit.id,
          title: inputVal.trim(),
        }),
      );

      setInputVal("");
      settodoToEdit(null);
      return;
    }

    dispatch(
      addTodo({
        id: Date.now(),
        title: inputVal.trim(),
      }),
    );

    setInputVal("");
  };

  useEffect(() => {
    if (todoToEdit) {
      setInputVal(todoToEdit.title);
    }
  }, [todoToEdit]);

  return (
    <div className="h-screen overflow-hidden bg-gray-100 flex items-center justify-center p-[clamp(12px,3vw,20px)]">
      <div className="w-[clamp(280px,92vw,530px)] h-[clamp(400px,90vh,640px)] bg-white rounded-[clamp(14px,2vw,18px)] shadow-xl p-[clamp(16px,4vw,24px)] flex flex-col">
        {/* Heading */}
        <h1 className="text-[clamp(20px,5vw,28px)] font-bold text-gray-800 text-center mb-[clamp(18px,4vw,22px)]">
          Todo List
        </h1>

        {/* Input + Button */}
        <form
          onSubmit={addTodoFn}
          className="flex gap-[clamp(6px,2vw,10px)] mb-[clamp(14px,3vw,18px)]"
        >
          <input
            ref={inputRef}
            onChange={(e) => setInputVal(e.target.value)}
            value={inputVal}
            type="text"
            placeholder="Enter a task..."
            className="flex-1 min-w-0 border-[1.5px] border-gray-300 shadow-none rounded-[clamp(8px,2vw,10px)] px-[clamp(10px,3vw,16px)] py-[clamp(9px,2vw,11px)] text-[clamp(13px,3vw,15px)] text-gray-700 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />

          <button
            className="shrink-0 bg-violet-600 hover:bg-violet-700 text-white px-[clamp(12px,3vw,20px)] rounded-[clamp(8px,2vw,10px)] text-[clamp(12px,3vw,14px)] font-medium cursor-pointer transition-all duration-200"
            type="submit"
          >
            {todoToEdit ? "Update Task" : "Add Task"}
          </button>
        </form>

        {/* Error UI */}
        <div
          className={`${error ? "" : "hidden"} flex items-center gap-[clamp(8px,2vw,12px)] bg-red-50 border-[1.5px] border-red-200 text-red-500 rounded-[clamp(8px,2vw,10px)] px-[clamp(10px,3vw,16px)] py-[clamp(9px,2vw,12px)] mb-[clamp(14px,3vw,18px)]`}
        >
          <i className="ph ph-warning-circle text-[clamp(17px,4vw,20px)] shrink-0"></i>

          <p className="text-[clamp(11px,2.5vw,13px)] leading-tight">{error}</p>
        </div>

        {/* Todos */}
        <div className="flex-1 space-y-[clamp(8px,2vw,12px)] overflow-auto scrollbar-none">
          {todos?.length > 0 ? (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between gap-[clamp(8px,2vw,12px)] border-[1.5px] border-gray-200 bg-gray-50 rounded-[clamp(8px,2vw,10px)] px-[clamp(10px,3vw,16px)] py-[clamp(10px,2vw,12px)] transition-all duration-200 hover:border-gray-300"
              >
                {/* Task Title */}
                <span className="min-w-0 truncate text-gray-700 text-[clamp(12px,3vw,15px)]">
                  {todo.title}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center gap-[clamp(5px,1.5vw,8px)] shrink-0">
                  <button
                    onClick={() => {
                      settodoToEdit(todo);
                      inputRef.current.focus();
                    }}
                    className="h-[clamp(30px,8vw,36px)] w-[clamp(30px,8vw,36px)] flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-500 cursor-pointer transition-all duration-200 hover:bg-blue-100 hover:text-blue-600"
                    title="Edit task"
                  >
                    <i className="ph ph-pencil-simple text-[clamp(15px,4vw,18px)]"></i>
                  </button>

                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="h-[clamp(30px,8vw,36px)] w-[clamp(30px,8vw,36px)] flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500 cursor-pointer transition-all duration-200 hover:bg-red-100 hover:text-red-600"
                    title="Delete task"
                  >
                    <i className="ph ph-trash text-[clamp(15px,4vw,18px)]"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center px-5">
              <div className="h-[clamp(44px,10vw,52px)] w-[clamp(44px,10vw,52px)] flex items-center justify-center rounded-full bg-violet-100 text-violet-600 mb-3">
                <i className="ph ph-check-square text-[clamp(22px,5vw,26px)]"></i>
              </div>

              <h2 className="text-gray-700 font-semibold text-[clamp(14px,3.5vw,17px)] mb-1">
                No tasks yet
              </h2>

              <p className="text-gray-400 text-[clamp(11px,2.5vw,13px)] max-w-[280px]">
                Add your first task above and start getting things done.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
