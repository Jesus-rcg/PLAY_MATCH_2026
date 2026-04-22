import express from "express";
import { getResultados, agregarResultados, editarResultados, eliminarResultados } from "../controllers/resultados.controller.js";

const router = express.Router();

router.get("/", getResultados);
router.post("/", agregarResultados);
router.put("/:id", editarResultados);
router.delete("/:id", eliminarResultados);

export default router;