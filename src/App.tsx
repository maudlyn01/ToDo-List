import { useEffect, useState } from "react";
import "./index.css";
import { CheckCircle, Moon, Sun, Trash } from "phosphor-react";

interface toDoProps {
  id: number; 
  text: string; 
  completed: boolean; 
  date: string
}

export const App = () => {
  const [toDo, setToDo] = useState<toDoProps[]>([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  //const [done, setDone] = useState(false);

  useEffect(() => {
    const storedToDo = localStorage.getItem("toDo");
    if(storedToDo) {
      setToDo(JSON.parse(storedToDo))
    }
  }, []);

  const saveToDo = (updated: toDoProps[]) => {
    localStorage.setItem("toDo", JSON.stringify(updated));
  }
  

  // Função que adiciona uma nova tarefa
  const addToDo = () => {
    if (input.trim()) {
      const today = new Date();
      const formattedDate =
        today.toLocaleDateString("pt-MZ") +
        " " +
        today.toLocaleTimeString("pt-MZ");

      setToDo([
        ...toDo,
        {
          id: Date.now(),
          text: input,
          completed: false,
          date: formattedDate,
        },
      ]);
      setInput("");
    }
  };

  const toggleComplete = (id: number) => {
    setToDo(
      toDo.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteToDo = (id: number) => {
    setToDo(toDo.filter((t) => t.id !== id));
  };

  return (
    <>
      <section
        className={`min-h-screen flex flex-col gap-4 items-center justify-center 
  ${darkMode
            ? "bg-gradient-to-r from-black via-purple-600 to-black text-white"
            : "bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 text-black"
          }`}
      >
        <div className="w-40 h-40">
          <img src="/logo-maud-todolist.png" alt="logo-maud-todolist" />
          {/* botão de tema */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-0 right-0 p-2 text-white hover:scale-110 transition-transform"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={40} /> : <Moon size={40} />}
          </button>
        </div>
        <div
          className={`shadow-lg rounded-3xl p-16 
          ${darkMode
              ? "bg-gradient-to-b from-black to-purple-800 shadow-black text-white"
              : "bg-gradient-to-b from-purple-300 to-purple-400 shadow-black"
            }`}
        >
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            What Do You Wanna Remember?
          </h1>
          <div className="mb-4 flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addToDo()}
              type="text"
              name="new"
              title="Write on me, please!!"
              id="addNew"

              placeholder="Add new task, will you?🤔"
              className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={addToDo}
              className="bg-purple-600 px-4 py-2 rounded-r-lg hover:bg-purple-200 font-bold cursor-pointer"
              title="Add New Task"
            >
              +
            </button>
            {/*onKeyDown={(e)=>e.key==='Enter' && addToDo()}*/}
          </div>
          <ul className="space-y-2">
            {toDo.map((todo) => (
              <li
                key={todo.id}
                className="flex flex-col items-center p-3 rounded-lg bg-purple-300 border border-purple-600"
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className="mr-2 h-5 w-5 text-green-800 cursor-pointer"
                      title="Toggle check"
                    >
                      {todo.completed ? (
                        <CheckCircle size={32} weight="fill" />
                      ) : (
                        <CheckCircle size={32} />
                      )}
                    </button>
                    {/*<input type="checkbox" checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className='mr-2 h-5 w-5 text-green-600 cursor-pointer' />
                  <span className={`flex-grow ${todo.completed ? "line-through text-gray-500" : "text-gray-800"} `}>
                    {todo.text}
                  </span>*/}
                    <span className={`flex-grow ${todo.completed ? "line-through text-gray-500" : "text-gray-800"} `}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteToDo(todo.id)}
                    //onKeyDown={(e)=>e.key==="Delete" && deleteToDo()}
                    className="ml-2 border-none p-2 rounded-lg text-purple-900 hover:text-red-600 cursor-pointer"
                    title="Delete">
                    <Trash size={20} />

                  </button>
                </div>
                <span className="mt-1 ml-30 text-xs text-gray-600">
                  {todo.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
