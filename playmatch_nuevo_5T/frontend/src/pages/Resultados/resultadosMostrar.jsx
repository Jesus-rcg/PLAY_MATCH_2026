import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/tabla.css";

function ResultadosTabla() {

  const [resultados, setResultados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const navigate = useNavigate();

  
  const obtenerResultados = () => {
    axios.get("http://localhost:3000/api/resultados")
      .then(res => {
        setResultados(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    obtenerResultados();
  }, []);

  const resultadosFiltrados = resultados.filter(r => {
    const texto = busqueda.toLowerCase();

    return (
      r.id_resultado.toString().includes(texto) ||
      r.id_encuentro.toLowerCase().includes(texto) ||
      r.goles_local.toLowerCase().includes(texto) ||
      r.goles_visitante.toString().includes(texto) ||
      r.faltas_local.toString().includes(texto) ||
      r.faltas_visitante.toString().includes(texto) ||
      r.tarjetas_amarillas.toString().includes(texto) ||
      r.tarjetas_rojas.toString().includes(texto) ||
      r.observaciones.toString().includes(texto) ||
      r.creador.toString().includes(texto) ||
      r.created_at.toString().includes(texto)
    );
});

  const indiceFinal = paginaActual * registrosPorPagina;
  const indiceInicial = indiceFinal - registrosPorPagina;
  const resultadosPagina = resultadosFiltrados.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(resultadosFiltrados.length / registrosPorPagina);

  return (
    <div className="tabla-container">

      <h2>Tabla de resultados</h2>
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
        onClick={() => navigate("/resultados/agregar")
        }>Agregar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID Resultado</th>
            <th>ID Encuentro</th>
            <th>Goles E.Local</th>
            <th>Goles E.Visitante</th>
            <th>Faltas E.Local</th>
            <th>Faltas E.Visitante</th>
            <th>Tarjetas amarillas</th>
            <th>Tarjetas rojas</th>
            <th>Observaciones</th>
            <th>Creador</th>
            <th>Fecha de creación</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {resultadosPagina.length > 0 ? (
            resultadosPagina.map((r) => (
              <tr key={r.id_resultado}>
                <td>{r.id_resultado}</td>
                <td>{r.id_encuentro}</td>
                <td>{r.goles_local}</td>
                <td>{r.goles_visitante}</td>
                <td>{r.faltas_local}</td>
                <td>{r.faltas_visitante}</td>
                <td>{r.tarjetas_amarillas}</td>
                <td>{r.tarjetas_rojas}</td>
                <td>{r.observaciones}</td>
                <td>{r.creador}</td>
                <td>{r.created_at}</td>
                <td>
                  <button className="btn-edit" onClick={() => navigate(`/resultados/editar/${r.id_resultado}`)}>Editar</button>
                  <button className="btn-delete" onClick={() => navigate(`/resultados/eliminar/${r.id_resultado}`)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No hay resultados</td>
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

export default ResultadosTabla;