import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const getUsuarios = (req, res) => {
  const sql =
    "SELECT id_usuario, nombre, email, rol, activo, fecha_actualizado FROM usuarios";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al obtener los usuarios",
      });
    }

    return res.status(200).json(results);
  });
};

export const crearUsuarios = async (req, res) => {
  const { nombre, email, password, rol, activo } = req.body;

  const passwordHash = await bcrypt.hash(password, 10); //Encriptar contraseña

  const sql =
    "INSERT INTO usuarios (nombre, email, password, rol, activo) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nombre, email, passwordHash, rol, activo], (err, results) => {
    //passwordHash se manda a la BD.
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al crear el usuario",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(400).json({
        message: "No se pudo crear el usuario",
      });
    }

    return res.status(201).json({
      message: "Usuario creado correctamente",
      id: results.insertId,
    });
  });
};

export const editarUsuarios = async (req, res) => {
  const { nombre, email, password, rol, activo } = req.body;

  let sql;
  let params;
  let passwordHash = password;

  if (password) {
    passwordHash = await bcrypt.hash(password, 10);

    sql =
      "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol = ?, activo = ? WHERE id_usuario = ?";
    params = [nombre, email, passwordHash, rol, activo, req.params.id];
  } else {
    sql =
      "UPDATE usuarios SET nombre = ?, email = ?, rol = ?, activo = ? WHERE id_usuario = ?";
    params = [nombre, email, rol, activo, req.params.id];
  }
  db.query(sql, params, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error al actualizar" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
    });
  });
};

export const eliminarUsuarios =  (req, res) => {
  const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: "Error al eliminar el usuario",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "Usuario eliminado correctamente",
    });
  });
};
