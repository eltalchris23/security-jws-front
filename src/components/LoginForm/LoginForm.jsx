//rafce
import React from 'react'
import './LoginForm.css';
import { useEffect, useState } from 'react';
import { login } from '../../services/authService'
//import { useNavigate } from 'react-router-dom';

const LoginForm = ({ show, onClose}) => {
    //console.log ("show", show, "onClose", onClose);

    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  //  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(username,password);

            if (data.success) {
                localStorage.setItem("token", data.token);
                alert(data.message);

                onClose();
            } else {
                alert("Error: " + data.error);
            }

        } catch (error) {
            console.error(error);
            alert ("Error en el servidor o credenciales incorrectas");
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
