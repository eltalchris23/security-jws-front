//rafce
import React from 'react'
import './LoginForm.css';
import { useEffect, useState } from 'react';
import { login } from '../../services/authService'
//import { useNavigate } from 'react-router-dom';

const LoginForm = ({ show, onClose }) => {

    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //  const navigate = useNavigate();

    useEffect(() => {
        if (errorMessage) {
          const timer = setTimeout(() => {
            setErrorMessage("");
          }, 1000); // 2000 ms = 2 segundos
      
          // Limpia el timeout si el componente se desmonta o errorMessage cambia
          return () => clearTimeout(timer);
        }
      }, [errorMessage]);
      

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(username, password);

            if (data.success) {
                localStorage.setItem("token", data.token);
                alert(data.message);

                onClose();
            } else {
                setErrorMessage(data.error || "Error de autenticacion");
            }

        } catch (error) {
            console.error(error);
            setErrorMessage("Error en el servidor o credenciales incorrectas");
        }

    };

    // Cuando show cambia, manejamos la animación
    useEffect(() => {
        if (show) {
            setVisible(true);
        } else {
            // Delay para animación de fade-out
            const timeout = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [show]);

    if (!visible) return null;

    return (
        <div className={`login-overlay ${show ? "fade-in" : "fade-out"}`}>
            <div className="login-container">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Iniciar Sesión</h2>

                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
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
    )
}

export default LoginForm
