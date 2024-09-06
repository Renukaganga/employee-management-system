import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import Profile from './components/Profile';
import Signup from './components/Signup';
import CurrentTasks from './components/CurrentTasks';
import TaskHistory from './components/TaskHistory';
import Logout from './components/Logout';
import './components/Dashboard.css'
import CurrentTask from './components/employee/CurrentTask'
import HisEmp from './components/employee/HisEmp'
import { UserProvider } from './components/UserContext'; 
import Eprofile from './components/employee/Eprofile';

function App() {
    return (
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-task" element={<AddTask />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/eprofile" element={<Eprofile />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="/add-task" element={<AddTask />} />
                <Route path="/current-tasks" element={<CurrentTasks />} />
                <Route path="/task-history" element={<TaskHistory />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/current-emp" element={<CurrentTask />} />
                <Route path="/his-emp" element={<HisEmp />} />
            </Routes>
        </Router>
        </UserProvider>
    );
}

export default App;
