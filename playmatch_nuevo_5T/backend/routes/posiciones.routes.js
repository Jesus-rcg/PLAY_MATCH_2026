import express from "express";
import { getPosiciones, agregarPosiciones, editarPosiciones, eliminarPosiciones } from "../controllers/posiciones.controller.js";

const router = express.Router();

router.get("/", getPosiciones);
router.post("/", agregarPosiciones);
router.put("/:id", editarPosiciones);
router.delete("/:id", eliminarPosiciones);

export default router;