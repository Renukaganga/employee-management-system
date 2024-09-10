import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Edashboard from './Edashboard';
import { useUserContext } from '../UserContext'; // Custom hook to access user context

const HisEmp = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [error, setError] = useState('');
    const { userData } = useUserContext(); // Access user data from context

    // Function to fetch completed tasks for the logged-in employee
    const fetchCompletedTasks = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/tasks/completed/${userData.employeeId}`);
            setCompletedTasks(response.data);
            setError(''); // Clear any errors
        } catch (error) {
            console.error('Error fetching completed tasks:', error);
            setError('Failed to load completed tasks');
        }
    }, [userData.employeeId]);

    // Fetch completed tasks when the component mounts or userData changes
    useEffect(() => {
        if (userData && userData.employeeId) {
            fetchCompletedTasks();
        }
    }, [userData, fetchCompletedTasks]);

    return (
        <div>
            <div>
                <Edashboard />
            </div>
            <h2>Employee Task History</h2>
            {error && <p>{error}</p>}
            {completedTasks.length > 0 ? (
                <ul>
                    {completedTasks.map(task => (
                        <li key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Assigned to: {task.assignedTo}</p>
                            <p>Due date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <p>Status: {task.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No completed tasks.</p>
            )}
        </div>
    );
};

export default HisEmp;
