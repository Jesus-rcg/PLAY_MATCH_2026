import express from "express";
import { getTorneos, agregarTorneos, editarTorneos, eliminarTorneos } from "../controllers/torneos.controller.js";

const router = express.Router();

router.get("/", getTorneos);
router.post("/", agregarTorneos);
router.put("/:id", editarTorneos);
router.delete("/:id", eliminarTorneos);

export default router;