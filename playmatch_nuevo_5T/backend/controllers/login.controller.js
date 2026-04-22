import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const login = (req, res) => {
  const { correo, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [correo], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error del servidor" });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos",
      });
    }

    const usuario = result[0];

    const coincide = await bcrypt.compare(password, usuario.password);

    if (coincide) {
      res.json({
        message: "Login exitoso",
        usuario,
      });
    } else {
      res.status(401).json({
        message: "Correo o contraseña incorrectos",
      });
    }
  });
};