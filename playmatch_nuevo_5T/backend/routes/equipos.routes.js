import express from "express";
import { getEquipos, agregarEquipos, editarEquipos, eliminarEquipos } from "../controllers/equipos.controller.js";

const router = express.Router();

router.get("/", getEquipos);
router.post("/", agregarEquipos);
router.put("/:id", editarEquipos);
router.delete("/:id", eliminarEquipos);

export default router;