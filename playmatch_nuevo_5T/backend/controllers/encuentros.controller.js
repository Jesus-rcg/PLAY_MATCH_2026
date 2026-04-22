import { db } from "../config/db.js";

export const getEncuentros = (req, res) => {
  const sql = `
    SELECT
      en.id_encuentro, 
      en.id_torneo,
      en.id_equipo_local,
      en.id_equipo_visitante,

      t.nombre AS torneo, 
      eLocal.nombre AS equipo_local, 
      eVisitante.nombre AS equipo_visitante, 

      en.fecha, 
      en.lugar, 
      en.jornada, 
      en.id_arbitro,

      u.nombre AS arbitro,

      en.estado 
     FROM encuentros en
     JOIN torneos t ON en.id_torneo = t.id_torneo
     JOIN equipos eLocal ON en.id_equipo_local = eLocal.id_equipo
     JOIN equipos eVisitante ON en.id_equipo_visitante = eVisitante.id_equipo
     JOIN usuarios u ON en.id_arbitro = u.id_usuario`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

export const agregarEncuentros = (req, res) => {
  const {
    id_torneo,
    id_equipo_local,
    id_equipo_visitante,
    fecha,
    lugar,
    jornada,
    id_arbitro,
    estado,
  } = req.body;

  const sql = `
    INSERT INTO encuentros (id_torneo, id_equipo_local, id_equipo_visitante, fecha, lugar, jornada, id_arbitro, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      id_torneo,
      id_equipo_local,
      id_equipo_visitante,
      fecha,
      lugar,
      jornada,
      id_arbitro,
      estado,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Encuentro creado" });
    },
  );
};

export const editarEncuentros = (req, res) => {
  const { id } = req.params;

  const {
    id_torneo,
    id_equipo_local,
    id_equipo_visitante,
    fecha,
    lugar,
    jornada,
    id_arbitro,
    estado,
  } = req.body;

  const sql = `
    UPDATE encuentros SET
    id_torneo = ?,
    id_equipo_local = ?,
    id_equipo_visitante = ?,
    fecha = ?,
    lugar = ?,
    jornada = ?,
    id_arbitro = ?,
    estado = ?
    WHERE id_encuentro = ?
  `;

  db.query(
    sql,
    [
      id_torneo,
      id_equipo_local,
      id_equipo_visitante,
      fecha,
      lugar,
      jornada,
      id_arbitro,
      estado,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error al actualizar" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Encuentro no encontrado" });
      }

      return res.status(200).json({
        message: "Encuentro actualizado correctamente",
      });
    },
  );
};

export const eliminarEncuentros = (req, res) => {
  const sql = "DELETE FROM encuentros WHERE id_encuentro = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al eliminar el encuentro",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "Encuentro no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Encuentro eliminado correctamente",
    });
  });
};