import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/tabla.css";

function PosicionesTabla() {

  const [posiciones, setPosiciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const navigate = useNavigate();


  useEffect(() => {
    obtenerPosiciones();
  }, []);

  const obtenerPosiciones = () => {
    axios.get("http://localhost:3000/posiciones")
      .then(res => {
        setPosiciones(res.data);
      })
      .catch(err => console.log(err));
  };

  const posicionesFiltradas = posiciones.filter(p => {
    const texto = busqueda.toLowerCase();

    return (
      p.id_posicion.toString().includes(texto) ||
      p.torneo.toLowerCase().includes(texto) ||
      p.equipo.toLowerCase().includes(texto) ||
      p.jugados.toString().includes(texto) ||
      p.ganados.toString().includes(texto) ||
      p.empatados.toString().includes(texto) ||
      p.perdidos.toString().includes(texto) ||
      p.gf.toString().includes(texto) ||
      p.gc.toString().includes(texto) ||
      p.puntos.toString().includes(texto) ||
      p.actualizado.toString().includes(texto)
    );
});

  const indiceFinal = paginaActual * registrosPorPagina;
  const indiceInicial = indiceFinal - registrosPorPagina;
  const posicionesPagina = posicionesFiltradas.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(posicionesFiltradas.length / registrosPorPagina);

  return (
    <div className="tabla-container">

      <h2>Tabla de posiciones</h2>
      <div className="tabla-header">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => {
          setBusqueda(e.target.value); 
          setPaginaActual(1);
          }}
        />
        <button className="btn-add"
        onClick={() => navigate("/posiciones/agregar")
        }>Agregar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Torneo</th>
            <th>Equipo</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
            <th>PTS</th>
            <th>Actualizado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {posicionesPagina.length > 0 ? (
            posicionesPagina.map((p) => (
              <tr key={p.id_posicion}>
                <td>{p.id_posicion}</td>
                <td>{p.torneo}</td>
                <td>{p.equipo}</td>
                <td>{p.jugados}</td>
                <td>{p.ganados}</td>
                <td>{p.empatados}</td>
                <td>{p.perdidos}</td>
                <td>{p.gf}</td>
                <td>{p.gc}</td>
                <td>{p.puntos}</td>
                <td>{p.actualizado}</td>
                <td>
                  <button className="btn-edit" onClick={() => navigate(`/posiciones/editar/${p.id_posicion}`)}>Editar</button>
                  <button className="btn-delete" onClick={() => navigate(`/posiciones/eliminar/${p.id_posicion}`)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No hay resultados</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="paginacion">

        <button
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual(paginaActual - 1)}
        >
          Anterior
        </button>

        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i + 1)}
            className={paginaActual === i + 1 ? "activo" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={paginaActual === totalPaginas || totalPaginas === 0}
          onClick={() => setPaginaActual(paginaActual + 1)}
        >
          Siguiente
        </button>

      </div>

    </div>
  );
}

export default PosicionesTabla;