import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/axios";
import "../../styles/tabla.css";

function UsuariosTabla() {

  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const navigate = useNavigate();

  const obtenerUsuarios = () => {
    Api.get("/usuarios")
      .then(res => {
        setUsuarios(res.data);
      })
      .catch(err => console.log(err));
  };


  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter(u => {
    const texto = busqueda.toLowerCase();

    return (
      u.id_usuario.toString().includes(texto) ||
      u.nombre.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto) ||
      u.rol.toLowerCase().includes(texto) ||
      u.activo.toString().includes(texto)
    );
  });

  const indiceFinal = paginaActual * registrosPorPagina;
  const indiceInicial = indiceFinal - registrosPorPagina;
  const usuariosPagina = usuariosFiltrados.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(usuariosFiltrados.length / registrosPorPagina);

  return (
    <div className="tabla-container">

      <h2>Tabla de usuarios</h2>
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
        onClick={() => navigate("/usuarios/agregar")
        }>Agregar</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Fecha actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuariosPagina.length > 0 ? (
            usuariosPagina.map((u) => (
              <tr key={u.id_usuario}>
                <td>{u.id_usuario}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>{u.activo  === 1 ? "Sí" : "No"}</td>
                <td>{u.fecha_actualizado}</td>
                <td>
                  <button className="btn-edit"  onClick={() => navigate(`/usuarios/editar/${u.id_usuario}`)}>Editar</button>
                  <button className="btn-delete" onClick={() => navigate(`/usuarios/eliminar/${u.id_usuario}`)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay resultados</td>
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

export default UsuariosTabla;