import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import Down from "./Components/down";  
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      settodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (id) => {
    const t = todos.find((i) => i.id === id);
    settodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    settodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim() !== "") {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      settodo("");
    }
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />

      <div className="container mx-[375px] max-w-[50vw] my-[85px] rounded-2xl p-5 bg-slate-200 min-h-[75vh]">
        <h1 className="font-bold text-center text-xl">My-task A daily Task Manager</h1>
        <div className="addTodo my-5">
          <h2 className="text-lg font-semibold ml-1">Add a Task</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-[500px] font-semibold rounded-full px-5 py-1 mt-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="bg-slate-700 hover:bg-slate-800 text-white rounded-full p-4 py-2 mx-5 text-md font-bold"
          >
            <IoMdAddCircle />
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          name=""
        /> 
        <span className="font-semibold mx-2">Show Finished</span>
        <h1 className="text-xl font-bold text-center">Your Task</h1>

        <div className="todos text-center">
          {todos.length === 0 && (
            <div className="m-5 font-semibold text-xl">No Task for Display</div>
          )}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex w-[38vw] justify-between">
                <div className="flex gap-5 items-center font-semibold text-lg">
                  <input
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={handleCheckbox}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="button flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-slate-700 hover:bg-slate-800 text-white rounded-full p-4 py-2 mx-2 my-1 text-md font-bold"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-slate-700 hover:bg-slate-800 text-white rounded-full p-4 py-2 mx-1 my-1 text-md font-bold"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Down /> 
    </>
  );
}

export default App;
