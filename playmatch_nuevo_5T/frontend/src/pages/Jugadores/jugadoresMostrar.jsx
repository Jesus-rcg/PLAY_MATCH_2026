import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Api from "../../api/axios";
import "../../styles/tabla.css";

function JugadoresMostrar() {

    const [jugadores, setJugadores] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 5;

    const navigate = useNavigate();

    const obtenerJugadores = () => {
        Api.get("/jugadores")
            .then(res => {
                console.log("DATOS DEL BACKEND:", res.data); // 👈 AQUÍ
                setJugadores(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        obtenerJugadores();
    }, []);

    const safe = (val) => (val ?? "").toString().toLowerCase();

    const jugadoresFiltrados = jugadores.filter(j => {
        const texto = busqueda.toLowerCase();

        return (
            safe(j.id_jugador).includes(texto) ||
            safe(j.id_equipo).includes(texto) ||
            safe(j.equipo).includes(texto) ||
            safe(j.nombre).includes(texto) ||
            safe(j.apellido).includes(texto) ||
            safe(j.documento).includes(texto) ||
            safe(j.numero_camiseta).includes(texto) ||
            safe(j.estado).includes(texto)
        );
    });

    const indiceFinal = paginaActual * registrosPorPagina;
    const indiceInicial = indiceFinal - registrosPorPagina;
    const jugadoresPagina = jugadoresFiltrados.slice(indiceInicial, indiceFinal);

    const totalPaginas = Math.ceil(jugadoresFiltrados.length / registrosPorPagina);

    return (
        <div className="tabla-container">

            <h2>Tabla de Jugadores</h2>
            <div className="tabla-header">
                <input
                    type="text"
                    placeholder="Buscar.. "
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPaginaActual(1);
                    }}
                />
                <button className="btn-add"
                    onClick={() => navigate("/jugadores/agregar")
                    }>Agregar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID Jugador</th>
                        <th>Equipo</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Documento</th>
                        <th>Número camiseta</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {jugadoresPagina.length > 0 ? (
                        jugadoresPagina.map((j) => (
                            <tr key={j.id_jugador}>
                                <td>{j.id_jugador}</td>
                                <td>{j.equipo}</td>
                                <td>{j.nombre}</td>
                                <td>{j.apellido}</td>
                                <td>{j.documento}</td>
                                <td>{j.numero_camiseta}</td>
                                <td>{j.estado}</td>

                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => navigate(`/jugadores/editar/${j.id_jugador}`)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() => navigate(`/jugadores/eliminar/${j.id_jugador}`)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No hay resultados</td>
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

export default JugadoresMostrar;