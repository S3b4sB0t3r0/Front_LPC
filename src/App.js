import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Teatros from './pages/Teatros';
import Eventos from './pages/Eventos';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Reservas from './pages/Reservas';
import MisionyVision from './pages/MisionyVision';
import Cuenta from './pages/Cuenta';
import Restablecer from './pages/Restablecer';
import RestablecerContraseña from './pages/RestablecerContraseña';
import ProtectedRoute from './ProtectedPage';
import ProtectedAdmin from './ProtectedAdmin'; // Importa el nuevo componente
import Admin from './pages/Admin';

function App() {
  useEffect(() => {
    // URL de WebSocket para conectar con el backend
    const socket = new WebSocket('wss://back-lpc.onrender.com/ws');  // Ajusta la URL a la de tu backend

    socket.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };

    socket.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data);
    };

    socket.onerror = (error) => {
      console.log('Error en la conexión WebSocket:', error);
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    // Cerrar la conexión cuando el componente se desmonte
    return () => {
      socket.close();
    };
  }, []);  // Se ejecuta solo al montar el componente

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/teatros" element={<Teatros />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/admin" element={<ProtectedAdmin><Admin /></ProtectedAdmin>} /> {/* Ruta protegida */}
          <Route path="/mision" element={<MisionyVision />} />
          <Route path="/restablecer" element={<Restablecer />} />
          <Route path="/restablecer/:token" element={<RestablecerContraseña />} />

          {/* Rutas protegidas */}
          <Route path="/cuenta" element={<ProtectedRoute><Cuenta /></ProtectedRoute>} />
          <Route path="/reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
