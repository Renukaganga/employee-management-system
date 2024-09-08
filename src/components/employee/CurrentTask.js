import React, { useState } from 'react';
import axios from 'axios';
import Edashboard from './Edashboard';
import '../CurrentTasks.css'; // Import the CSS file
import { useUserContext } from '../UserContext'; // Import the custom hook

function CurrentTask() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const { userData } = useUserContext(); // Access user data from context

    const fetchTasks = () => {
        const loggedEmployeeId = userData?.id; // Safely access employee ID

        if (loggedEmployeeId) {
            axios.get(`http://localhost:5000/api/tasks?assignedTo=${loggedEmployeeId}`)
                .then(response => {
                    setTasks(response.data);
                    setError(''); // Clear any previous errors
                })
                .catch(error => {
                    console.error('Error fetching tasks:', error);
                    setError('Failed to load tasks');
                });
        } else {
            setError('No employee ID found. Please log in.');
        }
    };

    const handleStatusChange = async (taskId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, { status });
            // Update tasks after the status change
            setTasks(tasks.map(task => 
                task._id === taskId ? { ...task, status } : task
            ));
        } catch (error) {
            console.error('Error updating task status:', error);
            setError('Failed to update task status');
        }
    };

    return (
        <div className="current-tasks-container">
            <div className="dashboard-container">
                <Edashboard />
            </div>
            <div className="tasks-list-container">
                <div><h1>Employee Management System</h1></div>
                <h2>Current Tasks</h2>
                {error && <p>{error}</p>}
                
                {/* Button to manually trigger task fetching */}
                <button onClick={fetchTasks}>Load Current Tasks</button>

                <ul>
                    {tasks.length > 0 ? tasks.map(task => (
                        <li key={task._id} className="task-item">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Assigned to: {task.assignedTo}</p>
                            <p>Due date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <select 
                                value={task.status} 
                                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                            >
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <p>Status: {task.status}</p>
                        </li>
                    )) : <p>No tasks assigned.</p>}
                </ul>
            </div>
        </div>
    );
}

export default CurrentTask;
