import { useEffect, useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './NavBar.css';

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica si hay token en localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


  const handleLoginClick = () => setShowLogin(true);

  const handleCloseLogin = () => {
    setShowLogin(false);
    // Actualiza estado después del login
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Has cerrado sesión");
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
              <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="btn btn-login" onClick={handleLoginClick}>Login</button>
            )}
          </div>
        </div>
      </nav>
      
      {/* Formulario de login con animación */}
      <LoginForm show={showLogin} onClose={handleCloseLogin} />
    </>
  )
}

export default NavBar
