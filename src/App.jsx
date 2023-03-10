import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { nanoid } from "nanoid";
import { Button } from "./Button";

function App() {
  const [inputText, setInput] = useState('');
  const [SearchText, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  const [SearchTasks, setSearchTasks] = useState([]);
  const [inputMod, setInputMod] = useState('tasks');
  const inputRef = useRef();


  useEffect(() => {
    const localTasks = localStorage.getItem('tasks');
    if (localTasks) {
      const parsedTask = JSON.parse(localTasks);
      setTasks(parsedTask);
    } else {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
    inputRef.current.focus();
  }, []);

  function handleChangeEnter({ key }) {
    if (key === 'Enter') {
      btnClick();
    }
  }
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  function btnClick() {
    if (inputText !== '') {
      const newTask = {
        id: nanoid(),
        text: inputText
      };
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
      setInput('');
    } else {
      alert('Write Task!');
    }
  }

  const handleDelete = (taskId) => {
    const filtered = tasks.filter((task) => {
      if (taskId !== task.id) return task;
    });
    setSearchTasks(filtered);
    setTasks(filtered);
    localStorage.setItem('tasks', JSON.stringify(filtered));
  };
  const handleDeleteAll = () => setTasks([]);

  const toggleSearch = () => {
    if (inputMod === 'tasks') {
      setSearchTasks(tasks);
      setInputMod('search');
    }
    if (inputMod === 'search') setInputMod('tasks');
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);

    const filteredTask = tasks.filter((task) => {
      if (task.text.includes(event.target.value)) return task;
    });
    setSearchTasks(filteredTask);
  };
  const inputValue = inputMod === 'tasks' ? inputText : SearchText;
  const handleInput = inputMod === 'tasks' ? handleChange : handleSearchChange;
  const currentTasks = inputMod === 'tasks' ? tasks : SearchTasks;

  return (
    <div className="App">
      <h1>TODO List</h1>
      <div className="todo-actions">
        <button onClick={toggleSearch} className="searchBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          Search
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyUp={handleChangeEnter}
          ref={inputRef}
          placeholder="todo action"
        />
        {inputMod === 'tasks' && (
          <>
            <Button color="red" onClick={btnClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
              </svg>
              <span>Add</span>
            </Button>

            <button onClick={handleDeleteAll} className="deleteAllBtn">
              <span class="transition"></span>
              <span class="gradient"></span>
              <span class="label">Delete all</span>
            </button>
          </>
        )}
      </div>
      <div className="tasks">
        <div className="task">
          <ol>
            {currentTasks.map((task) => (
              <li className="listItem" key={task.id}>
                  {task.text}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="deleteBtn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="20" width="20">
                    <path fill="#252525" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                  </svg>
                  <span class="tooltiptext">remove</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
