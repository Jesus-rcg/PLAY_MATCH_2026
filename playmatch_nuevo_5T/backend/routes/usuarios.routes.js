import express from "express";
import { getUsuarios, crearUsuarios, editarUsuarios, eliminarUsuarios } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.get("/", getUsuarios);
router.post("/", crearUsuarios);
router.put("/:id", editarUsuarios);
router.delete("/:id", eliminarUsuarios);

export default router;