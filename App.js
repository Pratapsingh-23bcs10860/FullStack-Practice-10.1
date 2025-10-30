
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Fetch all todos
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add todo
  const addTodo = () => {
    if (!text) return;
    axios.post('http://localhost:5000/api/todos', { text })
      .then(res => setTodos([...todos, res.data]));
    setText('');
  };

  // Toggle complete
  const toggleComplete = (id, completed) => {
    axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed })
      .then(res => {
        setTodos(todos.map(t => t._id === id ? res.data : t));
      });
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(t => t._id !== id)));
  };

  return (
    <div className="App">
      <h1>📝 Todo Application</h1>
      <div>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Add new todo" 
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span 
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
