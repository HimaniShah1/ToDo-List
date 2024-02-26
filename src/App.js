import { useState, useEffect } from "react";
import Header from "./components/Header";
import ToDo from "./components/ToDo";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Complete ToDo App',
      completed: false
    },
    {
      id: 2,
      text: 'Complete ToDo App',
      completed: true
    },
  ]);

  const [text, setText] = useState('');
  const [filter, setFilter] = useState('All');

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function editTask(id, newText) {
    setTasks(tasks.map(task => {
      if(task.id === id) {
        return {...task, text: newText};
      }
      return task;
    }))
  }

  function toggleCompleted(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  useEffect(() => {
    const savedTasks = JSON.parse(
      localStorage.getItem('react-todo-app-data')
    );

    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-todo-app-data',
      JSON.stringify(tasks)
    );
  }, [tasks]);

  return (
    <div className="container">
      < Header />
      <div className="list-details">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask(text);
            }
          }}
          placeholder="Type to add task..."
        />
        <select id="dropdown" onChange={handleFilterChange} value={filter}>
          <option label="All">All</option>
          <option label="Completed">Completed</option>
          <option label="Incomplete">Incomplete</option>
        </select>
      </div>
      <div className="todo-component">
        {tasks
        .filter(task => {
          if(filter === 'Completed'){
            return task.completed;
          } else if(filter === 'Incomplete'){
            return !task.completed;
          }
          return true;
        })
        .map(task => (
          <ToDo
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
          />
        ))}

      </div>
    </div>
  );
}

export default App;
