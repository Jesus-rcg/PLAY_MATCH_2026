import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "clave_secreta";

export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
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

      const token = jwt.sign({
        id: usuario.id_usuario,
        rol: usuario.rol
      },
      SECRET_KEY,{
        expiresIn: "2h"
      }

      );

      const {password: _, ...usuarioSeguro} = usuario;

      res.json({
        message: "Login exitoso",
        token,
        usuario: usuarioSeguro
      });
      
    } else {
      res.status(401).json({
        message: "Correo o contraseña incorrectos",
      });
    }
  });
};