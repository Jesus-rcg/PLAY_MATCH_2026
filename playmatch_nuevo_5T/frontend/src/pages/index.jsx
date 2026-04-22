import React from 'react'
import { useNavigate } from 'react-router-dom'

function Index() {
  const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => navigate(`/usuarios`)}>Usuarios</button>
        <button onClick={() => navigate(`/posiciones`)}>Posiciones</button>
        <button onClick={() => navigate(`/torneos`)}>Torneos</button>
        <button onClick={() => navigate(`/equipos`)}>Equipos</button>
        <button onClick={() => navigate(`/login`)}>Login</button>
    </div>
  )
}

export default Index;