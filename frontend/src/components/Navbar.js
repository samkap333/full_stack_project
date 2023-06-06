import React from 'react';
import { useAuth } from './Authcontext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faLanguage , faWallet } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  const { isAuthenticated,logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
	localStorage.removeItem('token');
	logout();

	navigate('/login');
};

  return (
    <>
      {isAuthenticated ? (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
          <div className="navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  <FontAwesomeIcon icon={faUser} /> Admin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  <FontAwesomeIcon icon={faLanguage} /> English
                </a>
              </li>
              <li className="nav-item">
  <a className="nav-link text-dark" href="#" onClick={()=> navigate('/connect-wallet')}>
    <FontAwesomeIcon icon={faWallet} /> Wallet
  </a>
</li>

              <li className="nav-item">
                <a className="nav-link text-dark" href="#" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        navigate('/login')
      )}
    </>
  );
}

export default Navbar;
