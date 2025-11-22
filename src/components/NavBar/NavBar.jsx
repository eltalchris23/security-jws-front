import { useEffect, useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { isTokenExpired, logout } from '../../services/authToken';
import './NavBar.css';

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const expired = await isTokenExpired(token);
        setIsLoggedIn(!expired);
        if (expired) localStorage.removeItem("token");
      } else {
        setIsLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  const handleLoginClick = () => setShowLogin(true);

  const handleLoginSuccess = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const expired = await isTokenExpired(token);
      setIsLoggedIn(!expired);
    } else {
      setIsLoggedIn(false);
    }
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          <a className="navbar-brand" href="#">MiEmpresa</a>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Servicios</a>
              </li>
            </ul>

            {isLoggedIn ? (
              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="btn btn-login" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginForm show={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default NavBar;
