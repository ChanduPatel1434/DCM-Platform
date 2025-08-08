import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md'; // Optional icon

const TodoListCard = () => {
  const [tasks, setTasks] = useState([
    { label: 'Finish React assignment', done: false },
    { label: 'Review UI feedback', done: false },
    { label: 'Schedule class with tutor', done: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { label: newTask.trim(), done: false }]);
      setNewTask('');
    }
  };

  return (
    <div className="card border rounded h-100">
      <div className="card-header bg-info-subtle border-bottom">
        <h6 className="mb-0 text-dark">📝 To-Do List</h6>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush mb-3">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`task-${index}`}
                  checked={task.done}
                  onChange={() => toggleTask(index)}
                />
                <label
                  className={`form-check-label ${task.done ? 'text-decoration-line-through text-muted' : ''}`}
                  htmlFor={`task-${index}`}
                >
                  {task.label}
                </label>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTask(index)}
                title="Delete task"
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="btn btn-outline-primary" onClick={addTask}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default TodoListCard;