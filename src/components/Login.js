import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext'; // Import the custom hook
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();
    const { updateUser } = useUserContext(); // Access updateUser function from context

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);

            
            const userResponse = await axios.get('http://localhost:5000/api/auth/profile', {
                headers: {
                    Authorization: `Bearer ${res.data.token}`,
                },
            });

            // Update user details in context
            updateUser(userResponse.data);

            // Navigate to profile page
            navigate('/profile');
        } catch (error) {
            console.error('Login error:', error);
            setError('Email or password is incorrect.'); // Set error message
            alert('Invalid password or Email')
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-image"></div>
            <div className="login-form-container">
                <div><h1>Employee Management System</h1></div>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">Login</button>
            </div>
        </div>
    );
}

export default Login;
