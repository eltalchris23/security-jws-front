import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import { login } from '../../services/authService';

const LoginForm = ({ show, onClose, onLoginSuccess }) => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await login(username, password);
  
      if (data.success) {
        localStorage.setItem("token", data.token);
        alert(data.message);
  
        await onLoginSuccess(); // Espera a actualizar estado en NavBar
      } else {
        setErrorMessage(data.error || "Error de autenticación");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error en el servidor o credenciales incorrectas");
    }
  };

  if (!visible) return null;

  return (
    <div className={`login-overlay ${show ? "fade-in" : "fade-out"}`}>
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Iniciar Sesión</h2>

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Usuario"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-login">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
