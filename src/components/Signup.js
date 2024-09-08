import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import './Signup.css'; // Import the CSS file

function Signup({ history }) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { 
                name, 
                role, 
                address, 
                phoneNumber, 
                password, 
                email, 
                employeeId 
            });
    
            console.log('Signup response:', response.data); // Log the response
    
            if (response.status === 201 || response.status === 200) {
                alert('Employee Added Successfully');
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error.response ? error.response.data : error.message);
            alert('Error adding employee');
        }
    };
    

    return (
        <div className="signup-container">
            <div className="dashboard-container">
                <Dashboard />
            </div>
            <div className="signup-form">
            <div><h1>Employee Management System</h1></div>
                <h2>Add Employee</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSignup}>Add Employee</button>
            </div>
        </div>
    );
}

export default Signup;
