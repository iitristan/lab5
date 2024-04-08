import React, { useState, useMemo } from 'react';
import ToDoList from './components/ToDoList';
import AddToDoForm from './components/Form';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');

  const toggleToDo = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      })
    );
  };

  const deleteToDo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  function handleAddItem(newTodo) {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  }

  function handleClearAll() {
    const confirmed = window.confirm('Are you sure you want to clear all to-dos?');
    if (!confirmed) return;
    setTodos([]);
  }

  // Apply sorting and filtering
  const sortedAndFilteredTodos = useMemo(() => {
    let filteredTodos = todos;

    if (filterCriteria) {
      filteredTodos = filteredTodos.filter((todo) =>
        filterCriteria === 'finished' ? todo.isDone : !todo.isDone
      );
    }

    switch (sortCriteria) {
      case 'name':
        filteredTodos = [...filteredTodos].sort((a, b) =>
          a.text.localeCompare(b.text)
        );
        break;
      case 'check':
        filteredTodos = [...filteredTodos].sort((a, b) =>
          a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1
        );
        break;
        case 'quantity':
        filteredTodos = [...filteredTodos].sort((a, b) => a.quantity - b.quantity);
        break;
      default:
        break;
    }

    return filteredTodos;
  }, [todos, sortCriteria, filterCriteria]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>To-Do List</h1>
        <p>Click on a to-do item to toggle its completion status</p>
      </header>
      <AddToDoForm addToDo={handleAddItem} />
      <ToDoList todos={sortedAndFilteredTodos} toggleToDo={toggleToDo} deleteToDo={deleteToDo} />
      <button onClick={handleClearAll}>Clear All</button>
      <select onChange={(e) => setSortCriteria(e.target.value)} placeholder="Sort By">
        <option value="">Select sort criteria</option>
        <option value="name">Sort by name</option>
        <option value="check">Sort by status</option>
        <option value="quantity">Sort by quantity</option>
      </select>
      <select onChange={(e) => setFilterCriteria(e.target.value)} placeholder="Filter By">
        <option value="">All</option>
        <option value="finished">Finished</option>
        <option value="unfinished">Unfinished</option>
      </select>
      <Footer todos={todos} />
    </div>
  );
};

export default App;
