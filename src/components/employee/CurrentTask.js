import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Edashboard from './Edashboard';
import '../CurrentTasks.css';
import { useUserContext } from '../UserContext'; // Custom hook to access user context

function CurrentTask() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [error, setError] = useState('');
    const { userData } = useUserContext(); // Access user data from context

    // Function to fetch all tasks
    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks/current');
            setTasks(response.data);
            setError(''); // Clear any errors
            console.log(userData);

            // Filter tasks assigned to the logged-in user
            const userTasks = response.data.filter(task => task.assignedTo === userData.employeeId);
            setFilteredTasks(userTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to load tasks');
        }
    }, [userData.employeeId]); // Re-run when userData.employeeId changes

    // Call fetchTasks when the component is mounted or userData changes
    useEffect(() => {
        if (userData && userData.employeeId) {
            fetchTasks();
        }
    }, [userData, fetchTasks]); // Add fetchTasks to dependencies

    const handleStatusChange = async (taskId, status) => {
        try {
            // Call backend to update the task status
            await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, { status });
            
            // Update tasks and filtered tasks after the status change
            const updatedTasks = tasks.map(task =>
                task._id === taskId ? { ...task, status } : task
            );
            setTasks(updatedTasks);

            const updatedFilteredTasks = filteredTasks.map(task =>
                task._id === taskId ? { ...task, status } : task
            );
            setFilteredTasks(updatedFilteredTasks);

            setError(''); // Clear any errors
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
                <ul>
                    {filteredTasks.length > 0 ? filteredTasks.map(task => (
                        <li key={task._id} className="task-item">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Assigned to: {task.assignedTo}</p>
                            <p>Due date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <select 
                                value={task.status} 
                                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
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
