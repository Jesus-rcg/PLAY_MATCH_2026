import { db } from "../config/db.js";

export const getPosiciones = (req, res) => {
  const sql = `
    SELECT
      p.id_posicion, 
      p.id_torneo,
      p.id_equipo,
      t.nombre AS torneo, 
      e.nombre AS equipo, 
      p.jugados, 
      p.ganados, 
      p.empatados, 
      p.perdidos, 
      p.gf, 
      p.gc, 
      p.puntos, 
      p.actualizado 
     FROM posiciones p
     JOIN torneos t ON p.id_torneo = t.id_torneo
     JOIN equipos e ON p.id_equipo = e.id_equipo`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al obtener las posiciones",
      });
    }
    return res.status(200).json(results);
  });
};

export const agregarPosiciones = (req, res) => {
  const {
    id_torneo,
    id_equipo,
    jugados,
    ganados,
    empatados,
    perdidos,
    gf,
    gc,
  } = req.body;

  const puntos = ganados * 3 + empatados * 1;

  const sql = `
    INSERT INTO posiciones (id_torneo, id_equipo, jugados, ganados, perdidos, gf, gc, puntos) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [id_torneo, id_equipo, jugados, ganados, perdidos, gf, gc, puntos],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error al crear la posición",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(400).json({
          message: "No se pudo crear la posición",
        });
      }

      return res.status(201).json({
        message: "Posición creada correctamente",
        id: results.insertId,
      });
    },
  );
};

export const editarPosiciones = (req, res) => {
  const { id } = req.params;

  const {
    id_torneo,
    id_equipo,
    jugados,
    ganados,
    empatados,
    perdidos,
    gf,
    gc,
  } = req.body;

  const puntos = ganados * 3 + empatados * 1;

  const sql = `
    UPDATE posiciones SET
    id_torneo = ?,
    id_equipo = ?,
    jugados = ?,
    ganados = ?,
    empatados = ?,
    perdidos = ?,
    gf = ?,
    gc = ?,
    puntos = ?
    WHERE id_posicion = ?
  `;

  db.query(
    sql,
    [
      id_torneo,
      id_equipo,
      jugados,
      ganados,
      empatados,
      perdidos,
      gf,
      gc,
      puntos,
      id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error al actualizar" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Posición no encontrada" });
      }

      return res.status(200).json({
        message: "Posición actualizada correctamente",
      });
    },
  );
};

export const eliminarPosiciones = (req, res) => {
  const sql = "DELETE FROM posiciones WHERE id_posicion = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al eliminar la posición",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "Posición no encontrada",
      });
    }

    return res.status(200).json({
      message: "Posición eliminada correctamente",
    });
  });
};
