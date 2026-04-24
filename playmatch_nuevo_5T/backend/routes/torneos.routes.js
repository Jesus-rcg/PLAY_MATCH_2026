import express from "express";
import {
  getTorneos,
  agregarTorneos,
  editarTorneos,
  eliminarTorneos
} from "../controllers/torneos.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Torneos
 *   description: API para gestión de torneos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Torneo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "541315a54dq54e"
 *         descripcion:
 *           type: string
 *           example: "sub 20"
 *         nombre:
 *           type: string
 *           example: "Copa América"
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           example: "2026-06-10"
 *         fecha_fin:
 *           type: string
 *           format: date
 *           example: "2026-07-20"
 *         estado:
 *           type: string
 *           example: "activo"
 */

/**
 * @swagger
 * /api/torneos:
 *   get:
 *     summary: Obtener todos los torneos
 *     tags: [Torneos]
 *     responses:
 *       200:
 *         description: Lista de torneos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Torneo'
 *       500:
 *         description: Error del servidor
 */
router.get("/", getTorneos);

/**
 * @swagger
 * /api/torneos:
 *   post:
 *     summary: Crear un torneo
 *     tags: [Torneos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - fecha_inicio
 *               - fecha_fin
 *               - estado
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Copa América"
 *               descripcion:
 *                 type: string
 *                 example: "sub 20"
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-10"
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-20"
 *               estado:
 *                 type: string
 *                 example: "activo"
 *     responses:
 *       201:
 *         description: Torneo creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", agregarTorneos);

/**
 * @swagger
 * /api/torneos/{id}:
 *   put:
 *     summary: Editar torneo
 *     tags: [Torneos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del torneo
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Copa América"
 *               descripcion:
 *                 type: string
 *                 example: "sub 20"
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-10"
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 example: "2026-07-20"
 *               estado:
 *                 type: string
 *                 example: "activo"
 *     responses:
 *       200:
 *         description: Torneo actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Torneo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", editarTorneos);

/**
 * @swagger
 * /api/torneos/{id}:
 *   delete:
 *     summary: Eliminar torneo
 *     tags: [Torneos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del torneo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Torneo eliminado correctamente
 *       404:
 *         description: Torneo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", eliminarTorneos);


export default router;