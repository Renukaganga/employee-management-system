import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import './AddTask.css';

function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    const handleAddTask = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/tasks/add', {
                title,
                description,
                assignedTo,
                dueDate
            });

            console.log('Response:', response);
            alert('Task Added Successfully'); // Set error message
            setError('Task Added Successfully')
            setTitle('');
            setDescription('');
            setAssignedTo('');
            setDueDate('');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="add-task-container">
            <div className="dashboard-container">
                <Dashboard />
            </div>
            <div className="add-task-form">
            <div><h1>Employee Management System</h1></div>
                <h2>Add Task</h2>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input 
                    type="text" 
                    placeholder="Assign To (Employee ID)" 
                    value={assignedTo} 
                    onChange={(e) => setAssignedTo(e.target.value)} 
                />
                <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                />
                <button onClick={handleAddTask}>Add Task</button>
               
            </div>
        </div>
    );
}

export default AddTask;
