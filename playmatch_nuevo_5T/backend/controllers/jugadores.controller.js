import { db } from "../config/db.js";

export const getJugadores = (req, res) => {
  const sql = `
    SELECT 
    j.id_jugador,
    j.id_equipo,
    e.nombre AS equipo,
    j.nombre,
    j.apellido,
    j.documento,
    j.numero_camiseta,
    j.estado
    FROM jugadores j
    JOIN equipos e ON j.id_equipo = e.id_equipo`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
};


export const agregarJugadores = async (req, res) => {
  const { id_equipo, nombre, apellido, documento, numero_camiseta, estado } =
    req.body;

  const sql = `
      INSERT INTO jugadores 
      (id_equipo, nombre, apellido, documento, numero_camiseta, estado) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [id_equipo, nombre, apellido, documento, numero_camiseta, estado],
    (err, results) => {
      //passwordHash se manda a la BD.
      if (err) return res.status(500).send(err);
      res.json({ id: results.insertId, ...req.body });
    },
  );
};

export const editarJugadores = (req, res) => {
  const { id } = req.params;

  const { id_equipo, nombre, apellido, documento, numero_camiseta, estado } =
    req.body;

  const sql = `
    UPDATE jugadores SET
    id_equipo = ?,
    nombre = ?,
    apellido = ?,
    documento = ?,
    numero_camiseta = ?,
    estado = ?
    WHERE id_jugador = ?
  `;

  db.query(
    sql,
    [id_equipo, nombre, apellido, documento, numero_camiseta, estado, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Jugador actualizado" });
    },
  );
};

export const eliminarJugadores = (req, res) => {
  const sql = "DELETE FROM jugadores WHERE id_jugador = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Torneo eliminado" });
  });
};

