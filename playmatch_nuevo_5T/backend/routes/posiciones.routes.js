import express from "express";
import { getPosiciones,
     agregarPosiciones, 
     editarPosiciones, 
     eliminarPosiciones } from "../controllers/posiciones.controller.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Posiciones 
 *   description: API para gestión de encuentros de fútbol
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Posiciones:
 *       type: object
 *       properties:
 *         id_posicion:
 *           type: number
 *           example: "1"
 *         id_torneo:
 *           type: number
 *           example: "1"
 *         id_equipo:
 *           type: number
 *           example: "2"
 *         jugados:
 *           type: number
 *           example: "3"
 *         ganados:
 *           type: number
 *           example: "1"
 *         empatados:
 *           type: number
 *           example: "1"
 *         perdidos:
 *           type: number
 *           example: "1"
 *         gf:
 *           type: number
 *           example: "3"
 *         gc:
 *           type: number
 *           example: "2"
 *         puntos:
 *           type: number
 *           example: "4"
 *         actualizado:
 *           type: date
 *           example: "2026-03-22 12:03:32"
 * 
 *         
 */

/**
 * @swagger
 * /api/posiciones:
 *   get:
 *     summary: Obtener todas las posiciones
 *     tags: [Posiciones]
 *     responses:
 *       200:
 *         description: Lista de posiciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posiciones'
 *       500:
 *         description: Error del servidor
 */
router.get("/", getPosiciones);

/**
 * @swagger
 * /api/posiciones:
 *   post:
 *     summary: Crear una nueva posición
 *     tags: [Posiciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_posicion
 *               - id_torneo
 *               - id_equipo
 *               - jugados
 *               - ganados
 *               - empatados
 *               - perdidos
 *               - gf
 *               - gc
 *               - puntos
 *               - actualizado
 *               
 *             properties:
 *               id_torneo:
 *                 type: number
 *                 example: "1"
 *               id_equipo:
 *                 type: number
 *                 example: "1"
 *               jugados:
 *                 type: number
 *                 example: "3"
 *               ganados:
 *                 type: number
 *                 example: "1"
 *               empatados:
 *                 type: number
 *                 example: "1"
 *               perdidos:
 *                 type: number
 *                 example: "1"
 *               gf:
 *                 type: number
 *                 example: "3"
 *               gc:
 *                 type: number
 *                 example: "2"
 *               puntos:
 *                 type: number
 *                 example: "4"
 *               actualizado:
 *                 type: date
 *                 example: "2026-03-22 12:03:32"
 *               
 *     responses:
 *       201:
 *         description: Posición creada correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", agregarPosiciones);

/**
 * @swagger
 * /api/posiciones/{id}:
 *   put:
 *     summary: Actualizar una posición
 *     tags: [Posiciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la posición
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *           
 *               id_torneo:
 *                 type: number
 *               id_equipo:
 *                 type: number
 *               jugados:
 *                 type: number
 *               ganados:
 *                 type: number
 *               empatados:
 *                 type: number
 *               perdidos:
 *                 type: number
 *               gf:
 *                 type: number
 *               gc:
 *                 type: number
 *               puntos:
 *                 type: number
 *               actualizado:
 *                 type: date
 *               
 *     responses:
 *       200:
 *         description: Posición actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Posición no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", editarPosiciones);

/**
 * @swagger
 * /api/posiciones/{id}:
 *   delete:
 *     summary: Eliminar una posición
 *     tags: [Posiciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la posición
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Posición eliminada correctamente
 *       404:
 *         description: Posición no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", eliminarPosiciones);
export default router;