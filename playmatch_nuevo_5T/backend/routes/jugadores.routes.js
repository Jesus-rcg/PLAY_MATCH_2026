import express from "express";
import { getJugadores, agregarJugadores, editarJugadores, eliminarJugadores } from "../controllers/jugadores.controller.js";

const router = express.Router();

router.get("/", getJugadores);
router.post("/", agregarJugadores);
router.put("/:id", editarJugadores);
router.delete("/:id", eliminarJugadores);

export default router;