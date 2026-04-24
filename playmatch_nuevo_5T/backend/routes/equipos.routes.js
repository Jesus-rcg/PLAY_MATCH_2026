import express from "express";
import { getEquipos, 
    agregarEquipos, editarEquipos, 
    eliminarEquipos } from "../controllers/equipos.controller.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Equipos 
 *   description: API para gestión de encuentros de fútbol
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Equipos:
 *       type: object
 *       properties:
 *         id_equipo:
 *           type: string
 *           example: "541315a54dq54e"
 *         id_torneo:
 *           type: string
 *           example: "121542"
 *         nombre:
 *           type: string
 *           example: "Los tigre S.C"
 *         entrenador:
 *           type: string
 *           example: "PEPITO"
 *         
 */

/**
 * @swagger
 * /api/equipos:
 *   get:
 *     summary: Obtener todos los encuentros
 *     tags: [Equipos]
 *     responses:
 *       200:
 *         description: Lista de equipos 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipos'
 *       500:
 *         description: Error del servidor
 */
router.get("/", getEquipos);

/**
 * @swagger
 * /api/equipos:
 *   post:
 *     summary: Crear un nuevo equipo
 *     tags: [Equipos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_equipo
 *               - id_torneo
 *               - nombre
 *               - entrenador
 *               
 *             properties:
 *               id_equipo:
 *                 type: string
 *                 example: "541315a54dq54e"
 *               id_torneo:
 *                 type: string
 *                 example: "sub20_2026"
 *               nombre:
 *                 type: string
 *                 example: "equipo_local_id"
 *               entrenador:
 *                 type: string
 *                 example: "equipo_visitante_id"
 *               
 *     responses:
 *       201:
 *         description: Encuentro creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", agregarEquipos);

/**
 * @swagger
 * /api/equipos/{id}:
 *   put:
 *     summary: Actualizar un equipo
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del equipo
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *           
 *               id_torneo_local:
 *                 type: string
 *               nombre:
 *                 type: string
 *               entrenador:
 *                 type: string
 *                 format: date
 *               
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
router.put("/:id", editarEquipos);

/**
 * @swagger
 * /api/equipos/{id}:
 *   delete:
 *     summary: Eliminar un equipo
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del equipo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipo eliminado correctamente
 *       404:
 *         description: Equipo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", eliminarEquipos);

export default router;