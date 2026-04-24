import express from "express";
import { getJugadores,
     agregarJugadores, 
     editarJugadores, 
     eliminarJugadores } from "../controllers/jugadores.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jugadores 
 *   description: API para gestión de encuentros de fútbol
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Jugadores:
 *       type: object
 *       properties:
 *         id_jugador:
 *           type: string
 *           example: "541315a54dq54e"
 *         id_equipo:
 *           type: string
 *           example: "121542"
 *         nombre:
 *           type: string
 *           example: "Los tigre S.C"
 *         apellido:
 *           type: string
 *           example: "PEPITO"
 *         documento:
 *           type: string
 *           example: "PEPITO"
 *         numero_camiseta:
 *           type: string
 *           example: "PEPITO"
 *         estado:
 *           type: string
 *           example: "PEPITO"
 *         
 */

/**
 * @swagger
 * /api/jugadores:
 *   get:
 *     summary: Obtener todos los jugadores
 *     tags: [Jugadores]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jugadores'
 *       500:
 *         description: Error del servidor
 */
router.get("/", getJugadores);

/**
 * @swagger
 * /api/jugadores:
 *   post:
 *     summary: Crear un nuevo jugador
 *     tags: [Jugadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_jugador
 *               - id_equipo
 *               - nombre
 *               - apellido
 *               - documento
 *               - numero_camiseta
 *               - estado
 *               
 *             properties:
 *               id_equipo:
 *                 type: string
 *                 example: "541315a54dq54e"
 *               nombre:
 *                 type: string
 *                 example: "sub20_2026"
 *               apellido:
 *                 type: string
 *                 example: "equipo_local_id"
 *               documento:
 *                 type: string
 *                 example: "equipo_visitante_id"
 *               numero_camiseta:
 *                 type: string
 *                 example: "equipo_visitante_id"
 *               estado:
 *                 type: string
 *                 example: "equipo_visitante_id"
 *               
 *     responses:
 *       201:
 *         description: Jugador creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", agregarJugadores);

/**
 * @swagger
 * /api/jugadores/{id}:
 *   put:
 *     summary: Actualizar un jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador
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
 *               id_equipo:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *                 format: date
 *               documento:
 *                 type: string
 *                 format: date
 *               numero_camiseta:
 *                 type: string
 *                 format: date
 *               estado:
 *                 type: string
 *                 format: date
 *               
 *     responses:
 *       200:
 *         description: Jugador actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Jugador no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", editarJugadores);

/**
 * @swagger
 * /api/jugadores/{id}:
 *   delete:
 *     summary: Eliminar un jugador
 *     tags: [Jugadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugador eliminado correctamente
 *       404:
 *         description: Jugador no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", eliminarJugadores);

export default router;




