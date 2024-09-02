import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import './TaskHistory.css'; // Import the CSS file

function TaskHistory() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch completed tasks from the backend
        axios.get('http://localhost:5000/api/tasks/current')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div className="task-history-container">
            <div className="dashboard-container">
                <Dashboard />
            </div>
            <div className="tasks-list-container">
            <div><h1>Employee Management System</h1></div>
                <h2>Task History</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Assigned to: {task.assignedTo}</p>
                            <p>Due date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <p>Status : Completed</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TaskHistory;
