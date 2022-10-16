import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const base_Todos_URL = "https://jsonplaceholder.typicode.com/todos";
  const getTodos = useCallback(async () => {
    try {
      const response = await axios.get(base_Todos_URL);
      const finalResponse = await response.data;
      return setTodos(finalResponse);
    } catch (err) {
      setTodos(err);
    }
  }, [todos]);
  useEffect(() => {
    getTodos();
  }, []);

  const prevHandler = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextHandler = () => {
    if (currentPage !== pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalNoOfPages = Math.ceil(todos.length / visibleTodos);
  let pages = [...Array(totalNoOfPages + 1).keys()].slice(1);
  console.log(pages);
  const lastIndex = currentPage * visibleTodos;
  const firstIndex = lastIndex - visibleTodos;
  const pageWiseTodos = todos.slice(firstIndex, lastIndex);
  return (
    <div className="App" style={{ textAlign: "left" }}>
      {pageWiseTodos &&
        pageWiseTodos.map((item) => {
          return (
            <div
              style={{
                border: "1px solid",
                margin: "10px",
                textAlign: "left",
                padding: "10px",
              }}
              key={item.id}
            >
              <span>{item.id}</span>
              <span>{item.title}</span>
            </div>
          );
        })}
      <div>
        <button style={{ margin: "20px" }} onClick={prevHandler}>
          pre
        </button>
      </div>
      {pages.map((page) => {
        return (
          <span
            onClick={() => setCurrentPage(page)}
            style={{
              padding: "10px",
              borderLeft: "1px solid",
              borderRight: "1px solid",
              margin: "10px",
              textAlign: "left",
              cursor: "pointer",
            }}
            key={page}
          >
            {page}
          </span>
        );
      })}
      <div>
        <button style={{ margin: "20px" }} onClick={nextHandler}>
          next
        </button>
      </div>
    </div>
  );
}

export default App;
