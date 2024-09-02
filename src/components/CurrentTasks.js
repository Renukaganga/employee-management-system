import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import './CurrentTasks.css'; // Import the CSS file

function CurrentTasks() {
    const [tasks, setTasks] = useState([]);
    

    useEffect(() => {
        // Fetch ongoing tasks from the backend
        axios.get('http://localhost:5000/api/tasks/current')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const handleStatusChange = async (taskId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, { status });
            // Filter out completed tasks from the list
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div className="current-tasks-container">
            <div className="dashboard-container">
                <Dashboard />
            </div>
            <div className="tasks-list-container">
            <div><h1>Employee Management System</h1></div>
                <h2>Current Tasks</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task._id} className="task-item">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Assigned to: {task.assignedTo}</p>
                            <p>Due date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            {/* <select 
                                value={task.status} 
                                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                            >
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select> */}
                            <p>Status: In Progress</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CurrentTasks;
