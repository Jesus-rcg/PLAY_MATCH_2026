import { db } from "../config/db.js";

export const getResultados = (req, res) => {
  const sql = `
    SELECT
      r.id_resultado, 
      r.id_encuentro,
      r.goles_local,
      r.goles_visitante,
      r.faltas_local,
      r.faltas_visitante,
      r.tarjetas_amarillas,
      r.tarjetas_rojas,
      r.observaciones,
      r.id_created_by,

      u.nombre AS creador,

      r.created_at

     FROM resultados r
     JOIN usuarios u ON r.id_created_by = u.id_usuario`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al obtener los encuentros",
      });
    }

    return res.status(200).json(results);
  });
};

export const agregarResultados = (req, res) => {
  const {
    id_encuentro,
    goles_local,
    goles_visitante,
    faltas_local,
    faltas_visitante,
    tarjetas_amarillas,
    tarjetas_rojas,
    observaciones,
    id_created_by,
  } = req.body;

  const sql = `
    INSERT INTO resultados (id_encuentro, goles_local, goles_visitante, faltas_local, faltas_visitante, tarjetas_amarillas, tarjetas_rojas, observaciones, id_created_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      id_encuentro,
      goles_local,
      goles_visitante,
      faltas_local,
      faltas_visitante,
      tarjetas_amarillas,
      tarjetas_rojas,
      observaciones,
      id_created_by,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error al crear el encuentro",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({
          message: "No se pudo crear el encuentro",
        });
      }

      return res.status(201).json({
        message: "Encuentro creado correctamente",
        id: result.insertId,
      });
    },
  );
};

export const editarResultados = (req, res) => {
  const { id } = req.params;

  const {
    id_encuentro,
    goles_local,
    goles_visitante,
    faltas_local,
    faltas_visitante,
    tarjetas_amarillas,
    tarjetas_rojas,
    observaciones,
    id_created_by,
  } = req.body;

  const sql = `
    UPDATE resultados SET
    id_encuentro = ?,
    goles_local = ?,
    goles_visitante = ?,
    faltas_local = ?,
    faltas_visitante = ?,
    tarjetas_amarillas = ?,
    tarjetas_rojas = ?,
    observaciones = ?,
    id_created_by = ?
    WHERE id_resultado = ?
  `;

  db.query(
    sql,
    [
      id_encuentro,
      goles_local,
      goles_visitante,
      faltas_local,
      faltas_visitante,
      tarjetas_amarillas,
      tarjetas_rojas,
      observaciones,
      id_created_by,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error al actualizar" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Resultado no encontrado" });
      }

      return res.status(200).json({
        message: "Resultado actualizado correctamente",
      });
    },
  );
};

export const eliminarResultados = (req, res) => {
  const sql = "DELETE FROM resultados WHERE id_resultado = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al eliminar el resultado",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "Resultado no encontrado",
      });
    }

    return res.status(200).json({
      message: "Resultado eliminado correctamente",
    });
  });
};
