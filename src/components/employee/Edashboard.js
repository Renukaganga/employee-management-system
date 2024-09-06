
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

function Edashboard() {
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
          <NavLink to="/current-emp" activeClassName="active">Current Tasks</NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/his-emp" activeClassName="active">Task History</NavLink>
          </li>
          <li className="nav-item">
          <NavLink to="/eprofile" activeClassName="active">Profile</NavLink>
          </li>

           <li className="nav-item">
           <button onClick={handleLogout}>Logout</button>
          </li>
         
        </ul>
      </div>
    </div>
  );
}

export default Edashboard;