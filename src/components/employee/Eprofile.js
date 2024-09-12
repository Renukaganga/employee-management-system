import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Profile.css';
import Edashboard from './Edashboard';
import { useUserContext } from '../UserContext';

function Eprofile() {
    const [profile, setProfile] = useState({
        id: '', 
        name: '',
        email: '',
        role: '',
        address: '',
        phoneNumber: ''
    });

    const { updateUser } = useUserContext(); // Use context to update user data
    const [isEditing, setIsEditing] = useState(false); // Track editing mode

    useEffect(() => {
        // Fetch the profile from backend
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data); // Set profile data from the response
                updateUser(response.data); // Update context with user data
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [updateUser]);

    // Handle input field changes for editing
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value, // Update the corresponding profile field
        }));
    };

    // Handle profile update (sending updated profile data to backend)
    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/api/auth/profile', profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data); // Update the state with the saved data
            setIsEditing(false); // Exit edit mode after saving
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="profile-page">
            <div className="sidebar">
                <Edashboard />
            </div>
            <div className="profile-content">
                <div><h1>Employee Management System</h1></div>
                <h2>Profile</h2>

                {isEditing ? (
                    // Editable form when in editing mode
                    <div>
                        <label>ID: </label>
                        <input type="text" name="id" value={profile.id} readOnly /> {/* ID is read-only */}
                        <label>Name: </label>
                        <input 
                            type="text" 
                            name="name" 
                            value={profile.name} 
                            onChange={handleChange} 
                            placeholder="Enter your name"
                        />
                        <label>Email: </label>
                        <input 
                            type="email" 
                            name="email" 
                            value={profile.email} 
                            onChange={handleChange} 
                            placeholder="Enter your email"
                        />
                        <label>Role: </label>
                        <input 
                            type="text" 
                            name="role" 
                            value={profile.role} 
                            onChange={handleChange} 
                            placeholder="Enter your role"
                        />
                        <label>Address: </label>
                        <input 
                            type="text" 
                            name="address" 
                            value={profile.address} 
                            onChange={handleChange} 
                            placeholder="Enter your address"
                        />
                        <label>Phone Number: </label>
                        <input 
                            type="text" 
                            name="phoneNumber" 
                            value={profile.phoneNumber} 
                            onChange={handleChange} 
                            placeholder="Enter your phone number"
                        />
                        <button className="update-button" onClick={handleUpdate}>
                            Save Changes
                        </button>
                        <button className="cancel-button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                ) : (
                    // Display profile data when not in editing mode
                    <div>
                        <p>ID: {profile.id}</p>
                        <p>Name: {profile.name}</p>
                        <p>Email: {profile.email}</p>
                        <p>Role: {profile.role}</p>
                        <p>Address: {profile.address}</p>
                        <p>Phone Number: {profile.phoneNumber}</p>
                        <button className="update-button" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Eprofile;
