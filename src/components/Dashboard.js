
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
  return (
    <div className="Dashboard">
      <div className="dashboard">
        <ul className="nav flex-column">
          <li className="nav-item">
          <NavLink to="/add-task" activeClassName="active">Add Task</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" activeClassName="active">Add Employee</NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/current-tasks" activeClassName="active">Current Tasks</NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/task-history" activeClassName="active">Task History</NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
          </li>

           <li className="nav-item">
           <button onClick={handleLogout}>Logout</button>
          </li>
         
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;