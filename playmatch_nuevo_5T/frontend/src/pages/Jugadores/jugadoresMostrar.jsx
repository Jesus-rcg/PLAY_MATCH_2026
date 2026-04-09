import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JugadoresMostrar() {

    const [jugadores, setJugadores] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const [paginaActual, setPaginaActual] = useState(1);
    const registrosPorPagina = 5;

    const navigate = useNavigate();

    useEffect(() => {
        obtenerJugadores();
    }, []);

    const obtenerJugadores = () => {
        axios.get("http://localhost:3000/jugadores")
            .then(res => {
                console.log("DATOS DEL BACKEND:", res.data); // 👈 AQUÍ
                setJugadores(res.data);
            })
            .catch(err => console.log(err));
    };

    const safe = (val) => (val ?? "").toString().toLowerCase();

    const jugadoresFiltrados = jugadores.filter(u => {
        const texto = busqueda.toLowerCase();

        return (
            safe(u.id_jugador).includes(texto) ||
            safe(u.id_equipo).includes(texto) ||
            safe(u.equipo).includes(texto) ||
            safe(u.nombre).includes(texto) ||
            safe(u.apellido).includes(texto) ||
            safe(u.documento).includes(texto) ||
            safe(u.numero_camiseta).includes(texto) ||
            safe(u.estado).includes(texto)
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
                        jugadoresPagina.map((u) => (
                            <tr key={u.id_jugador}>
                                <td>{u.id_jugador}</td>
                                <td>{u.equipo}</td>
                                <td>{u.nombre}</td>
                                <td>{u.apellido}</td>
                                <td>{u.documento}</td>
                                <td>{u.numero_camiseta}</td>
                                <td>{u.estado}</td>

                                <td>
                                    <button
                                        className="btn-edit"
                                        onClick={() => navigate(`/jugadores/editar/${u.id_jugador}`)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() => navigate(`/jugadores/eliminar/${u.id_jugador}`)}
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