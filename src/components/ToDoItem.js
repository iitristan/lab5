import React from 'react';

const ToDoItem = ({ todo, toggleToDo, deleteToDo }) => {
  const itemClass = todo.isDone ? 'todo-item completed' : 'todo-item';

  return (
    <li className={itemClass}>
      <span style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
        {todo.quantity} {todo.text}
      </span>
      <div>
        <button className="complete-btn" onClick={() => toggleToDo(todo.id)}>
          Complete
        </button>
        <button className="delete-btn" onClick={() => deleteToDo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};

export default ToDoItem;
