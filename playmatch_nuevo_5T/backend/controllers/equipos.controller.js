import { db } from "../config/db.js";

export const getEquipos = (req, res) => {
  const sql = `
    SELECT
      e.id_equipo, 
      e.id_torneo,
      t.nombre AS torneo, 
      e.nombre, 
      e.entrenador
     FROM equipos e
     JOIN torneos t ON e.id_torneo = t.id_torneo`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

export const agregarEquipos = (req, res) => {
  const { id_torneo, nombre, entrenador } = req.body;

  const sql = `
    INSERT INTO equipos (id_torneo, nombre, entrenador) 
    VALUES (?, ?, ?)`;
  db.query(sql, [id_torneo, nombre, entrenador], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Equipo creado" });
  });
};

export const editarEquipos = (req, res) => {
  const { id } = req.params;

  const { id_torneo, nombre, entrenador } = req.body;

  const sql = `
    UPDATE equipos SET
    id_torneo = ?,
    nombre = ?,
    entrenador = ?
    WHERE id_equipo = ?
  `;

  db.query(sql, [id_torneo, nombre, entrenador, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Equipo actualizado" });
  });
};

export const eliminarEquipos = (req, res) => {
  const sql = "DELETE FROM equipos WHERE id_equipo = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Equipo eliminado" });
  });
};
