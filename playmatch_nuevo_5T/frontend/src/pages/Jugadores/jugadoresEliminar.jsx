import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function JugadoresEliminar () {

    const navigate = useNavigate();
    const {id } = useParams();
    
    const eliminar = () =>  {
        axios.delete(`http://localhost:3000/jugadores/eliminar/${id}`)
        .then(() => {
            alert("Jugador eliminado correctamente");
            navigate("/jugadores")
        });
    };

    return (
        <div className="container">
      <div className="delete-card">
        <h2>Eliminar jugador</h2>
        <p>¿Estás seguro de que deseas eliminar esta jugador?</p>
        <button type='button' onClick={eliminar}>Eliminar</button>
        <button type='button' onClick={() => navigate("/jugadores")}>Cancelar</button>
      </div>
    </div>
    );

}
export default JugadoresEliminar;