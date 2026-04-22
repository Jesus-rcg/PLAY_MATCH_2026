import express from "express";
import { getEncuentros, agregarEncuentros, editarEncuentros, eliminarEncuentros } from "../controllers/encuentros.controller.js";

const router = express.Router();

router.get("/", getEncuentros);
router.post("/", agregarEncuentros);
router.put("/:id", editarEncuentros);
router.delete("/:id", eliminarEncuentros);

export default router;