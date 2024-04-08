import React, { useState } from 'react';

const AddToDoForm = ({ addToDo }) => {
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(1); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!text) return;

    const newToDo = {
      id: Date.now(),
      text,
      isDone: false,
      quantity: parseInt(quantity, 10), // Ensure quantity is an integer
    };

    setText('');
    setQuantity(1); // Reset quantity to 1 after adding
    addToDo(newToDo);
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="form-group">
        Quantity:
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)} 
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task"
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddToDoForm;
