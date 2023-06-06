import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { useAuth } from './Authcontext';


function Sidebar() {
    // const [userType, setUserType] = useState(null);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();


    // useEffect(() => {
    //     if (isAuthenticated) {

    //         const loggedInUserRole = localStorage.getItem('loggedInUserRole');
    //         setUserType(loggedInUserRole);
    //     }
    // }, [isAuthenticated]);



    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();

        navigate('/login');
    };

    if (!isAuthenticated) {
        return (
            <div>

            </div>
        );
    }
    return (
        <>
          {isAuthenticated ? (
            <nav id="sidebar" className="sidebar js-sidebar">
              <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="/">
                  <span className="align-middle">GoFund</span>
                </a>
      
                <ul className="sidebar-nav">
                  <li className="sidebar-item">
                    <a className="sidebar-link" onClick={() => navigate('/dashboard')}>
                      <i className="align-middle" data-feather="dashboard"></i>
                      <span className="align-middle">Dashboard</span>
                    </a>
                  </li>
      
                  <li className="sidebar-item">
                    <a className="sidebar-link" onClick={() => navigate('/loanoffer')}>
                      <i className="align-middle" data-feather="loanoffer"></i>
                      <span className="align-middle">Create Loan Offers</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a className="sidebar-link" onClick={() => navigate('/admin')}>
                      <i className="align-middle" data-feather="admin"></i>
                      <span className="align-middle">Manage Admins</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a className="sidebar-link" onClick={() => navigate('/banner')}>
                      <i className="align-middle" data-feather="log-in"></i>
                      <span className="align-middle">Pop Up Banners</span>
                    </a>
                  </li>
      
                  <li className="sidebar-item">
                    <a className="sidebar-link" onClick={() => navigate('/notify')}>
                      <i className="align-middle" data-feather="announcement"></i>
                      <span className="align-middle">Announcement/Notification</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a className="sidebar-link" onClick={() => navigate('/loanactivity')}>
                      <i className="align-middle" data-feather="sliders"></i>
                      <span className="align-middle">Loan Requests</span>
                    </a>
                  </li>
      
                  <li className="sidebar-item">
                    <a className="sidebar-link" onClick={() => navigate('/users')}>
                      <i className="align-middle" data-feather="user-plus"></i>
                      <span className="align-middle">Users</span>
                    </a>
                  </li>
      
                  <li className="sidebar-item">
                    <a className="sidebar-link" onClick={() => navigate('/settings')}>
                      <i className="align-middle" data-feather="settings"></i>
                      <span className="align-middle">Settings</span>
                    </a>
                  </li>
      
                </ul>
                <div className="sidebar-cta">
                  <li className="sidebar-item" onClick={handleLogout}>
                    <a className="sidebar-link">
                      <i className="align-middle" data-feather="bar-chart-2"></i>
                      <span className="align-middle">Logout</span>
                    </a>
                  </li>
                </div>
              </div>
            </nav>
          ) : (
            <></>
          )}
        </>
      );
          }

export default Sidebar;
