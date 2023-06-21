import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TasksList.css';

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/tasks');

            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createTask = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/tasks', {
                title: newTaskTitle,
            });

            console.log(response.data)

            const createdTask = {
                id: response.data.id,
                title: newTaskTitle,
                source: 'Database',
            };

            setTasks([...tasks, createdTask]);
            setNewTaskTitle('');
        } catch (error) {
            console.error(error);
        }
    };

    const editTask = async (task) => {
        console.log(task)
        try {
            const updatedTask = await axios.put(
                `http://localhost:8000/api/tasks/${task.id}`,
                {
                    title: task.title,
                }
            );

            const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask.data : t));
            setTasks(updatedTasks);
            setEditTaskId(null);
        } catch (error) {
            console.error(error);
        }
    };



    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Tasks</h1>
            <div className="task-block">
                <h2 className="section-title">Tasks from Database</h2>
                <ul className="task-list">
                    {tasks
                        .filter((task) => task.source === 'Database')
                        .map((task, index) => (
                            <li className="task-item" key={`task-${index}`}>
                                {editTaskId === task.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={task.title}
                                            onChange={(e) =>
                                                setTasks((prevTasks) =>
                                                    prevTasks.map((t) =>
                                                        t.id === task.id ? { ...t, title: e.target.value } : t
                                                    )
                                                )
                                            }
                                        />
                                        <button onClick={() => editTask(task)}>Save</button>
                                    </>
                                ) : (
                                    <>
                                        <span>{task.title}</span>
                                        <button onClick={() => setEditTaskId(task.id)}>Edit</button>
                                    </>
                                )}
                                <button onClick={() => deleteTask(task.id)}>Delete</button>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="task-block">
                <h2 className="section-title">Tasks from Redis Cache</h2>
                <ul className="task-list">
                    {tasks
                        .filter((task) => task.source === 'Redis')
                        .map((task) => (
                            <li className="task-item" key={task.id}>
                                {task.title}
                            </li>
                        ))}
                </ul>
            </div>

            <div className="input-section">
                <input
                    className="input-field"
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                <button className="add-button" onClick={createTask}>
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TasksList;