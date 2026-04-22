import { db } from "../config/db.js";

export const getTorneos = (req, res) => {
  db.query(
    "SELECT id_torneo, nombre, descripcion, fecha_inicio, fecha_fin, estado FROM torneos",
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error al obtener los torneos",
        });
      }

      return res.status(200).json(results);
    },
  );
};

export const agregarTorneos = async (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin, estado } = req.body;

  const sql =
    "INSERT INTO torneos (nombre, descripcion, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, descripcion, fecha_inicio, fecha_fin, estado],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Error al crear el torneo",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(400).json({
          message: "No se pudo crear el torneo",
        });
      }

      return res.status(201).json({
        message: "Torneo creado correctamente",
        id: results.insertId,
      });
    },
  );
};

export const editarTorneos = async (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin, estado } = req.body;

  const sql =
    "UPDATE torneos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id_torneo = ?";
  db.query(
    sql,
    [nombre, descripcion, fecha_inicio, fecha_fin, estado, req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error al actualizar" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Torneo no encontrado" });
      }

      return res.status(200).json({
        message: "Torneo actualizado correctamente",
      });
    },
  );
};

export const eliminarTorneos = (req, res) => {
  const sql = "DELETE FROM torneos WHERE id_torneo = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al eliminar el torneo",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "Torneo no encontrado",
      });
    }

    return res.status(200).json({
      message: "Torneo eliminado correctamente",
    });
  });
};