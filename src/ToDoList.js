import React, { useState } from "react";
import "./index.css"
function ToDoList() {
    const [tasks, setTasks] = useState(["Eating", "Drinking", "Taking shower"]);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    function handleInputChange(e) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...tasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function handleEditChange(e) {
        setEditedTask(e.target.value);
    }

    function saveEditTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editedTask;
        setTasks(updatedTasks);
        setIsEditing(null);
        setEditedTask("");
    }

    function editTask(index) {
        setIsEditing(index);
        setEditedTask(tasks[index]);
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
           
            <div>
                <input
                    type="text"
                    placeholder="Enter a task...."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {isEditing === index ? (
                            <input
                                type="text"
                                value={editedTask}
                                onChange={handleEditChange}
                                onBlur={() => saveEditTask(index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveEditTask(index);
                                }}
                                autoFocus
                            />
                        ) : (
                            <span className="text">{task}</span>
                        )}
                        <button className="edit-button" onClick={() => editTask(index)}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button className="move-up-button" onClick={() => moveTaskUp(index)}>
                            ☝️
                        </button>
                        <button className="move-down-button" onClick={() => moveTaskDown(index)}>
                            👇
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
