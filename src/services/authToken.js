// src/services/authToken.js

// Decodifica el payload del JWT manualmente
export const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };
  
  // Verifica si el token está expirado
  export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return true;
  
    const now = Date.now() / 1000; // Tiempo actual en segundos
    return payload.exp < now;
  };
  
  // Función para cerrar sesión
  export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Cambia esta ruta si tu login es diferente
  };
  