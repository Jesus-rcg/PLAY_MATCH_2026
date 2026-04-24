import express from "express";
import { 
    getEncuentros,
     agregarEncuentros,
      editarEncuentros, 
      eliminarEncuentros } from "../controllers/encuentros.controller.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Encuentros
 *   description: API para gestión de encuentros de fútbol
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Encuentro:
 *       type: object
 *       properties:
 *         id_encuentro:
 *           type: string
 *           example: "541315a54dq54e"
 *         id_torneo:
 *           type: string
 *           example: "sub20_2026"
 *         id_equipo_local:
 *           type: string
 *           example: "equipo_local_id"
 *         id_equipo_visitante:
 *           type: string
 *           example: "equipo_visitante_id"
 *         fecha:
 *           type: string
 *           format: date
 *           example: "2026-07-20"
 *         lugar:
 *           type: string
 *           example: "Bogotá"
 *         jornada:
 *           type: string
 *           example: "Jornada 1"
 *         id_arbitro:
 *           type: string
 *           example: "arbitro_id"
 *         estado:
 *           type: string
 *           example: "activo"
 */

/**
 * @swagger
 * /api/encuentros:
 *   get:
 *     summary: Obtener todos los encuentros
 *     tags: [Encuentros]
 *     responses:
 *       200:
 *         description: Lista de encuentros 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Encuentros'
 *       500:
 *         description: Error del servidor
 */
router.get("/", getEncuentros);

/**
 * @swagger
 * /api/encuentros:
 *   post:
 *     summary: Crear un nuevo encuentro
 *     tags: [Encuentros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_torneo
 *               - id_equipo_local
 *               - id_equipo_visitante
 *               - fecha
 *               - lugar
 *               - jornada
 *               - id_arbitro
 *               - estado
 *             properties:
 *               id_encuentro:
 *                 type: string
 *                 example: "541315a54dq54e"
 *               id_torneo:
 *                 type: string
 *                 example: "sub20_2026"
 *               id_equipo_local:
 *                 type: string
 *                 example: "equipo_local_id"
 *               id_equipo_visitante:
 *                 type: string
 *                 example: "equipo_visitante_id"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-20"
 *               lugar:
 *                 type: string
 *                 example: "Bogotá"
 *               jornada:
 *                 type: string
 *                 example: "Jornada 1"
 *               id_arbitro:
 *                 type: string
 *                 example: "arbitro_id"
 *               estado:
 *                 type: string
 *                 example: "activo"
 *     responses:
 *       201:
 *         description: Encuentro creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", agregarEncuentros);

/**
 * @swagger
 * /api/encuentros/{id}:
 *   put:
 *     summary: Actualizar un encuentro
 *     tags: [Encuentros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encuentro
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_torneo:
 *                 type: string
 *               id_equipo_local:
 *                 type: string
 *               id_equipo_visitante:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               lugar:
 *                 type: string
 *               jornada:
 *                 type: string
 *               id_arbitro:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Encuentro actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Encuentro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", editarEncuentros);

/**
 * @swagger
 * /api/encuentros/{id}:
 *   delete:
 *     summary: Eliminar un encuentro
 *     tags: [Encuentros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encuentro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Encuentro eliminado correctamente
 *       404:
 *         description: Encuentro no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", eliminarEncuentros);

export default router;