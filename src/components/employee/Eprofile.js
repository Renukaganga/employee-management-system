import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Profile.css';
import Edashboard from './Edashboard';

function Eprofile() {
    const [profile, setProfile] = useState({ name: '', email: '', role: '' });

    useEffect(() => {
        // Fetch profile data from the backend
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = () => {
        // Logic to update profile
    };

    return (
        <div className="profile-page">
            <div className="sidebar">
                <Edashboard />
            </div>
            <div className="profile-content">
            <div><h1>Employee Management System</h1></div>
                <h2>Profile</h2>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <p>Role: {profile.role}</p>
                <p>Address: {profile.address}</p>
                <p>Phone Number:{profile.phoneNumber}</p>
                <button className="update-button" onClick={handleUpdate}>
                    Update Profile
                </button>
            </div>
        </div>
    );
}

export default Eprofile;
