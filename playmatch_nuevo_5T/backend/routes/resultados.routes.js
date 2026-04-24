import express from "express";
import { getResultados, 
    agregarResultados, 
    editarResultados, 
    eliminarResultados } 
    from "../controllers/resultados.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resultados 
 *   description: API para gestión de resultados de fútbol
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Resultados:
 *       type: object
 *       properties:
 *         id_resultado:
 *           type: number
 *           example: "7"
 *         id_encuentro:
 *           type: number
 *           example: "2"
 *         goles_local:
 *           type: number
 *           example: "3"
 *         goles_visitantes:
 *           type: number
 *           example: "0"
 *         faltas_local:
 *           type: number
 *           example: "10"
 *         faltas_visitante:
 *           type: number
 *           example: "11"
 *         tarjetas_amarillas:
 *           type: number
 *           example: "5"
 *         tarjetas_rojas:
 *           type: number
 *           example: "0"
 *         observaciones:
 *           type: string
 *           example: "El partido fue interumpido por varias faltas"
 *         id_created_by:
 *           type: number
 *           example: "2"
 *         created_at:
 *           type: date
 *           example: "2026-03-22 12:03:32"
 * 
 *         
 */

/**
 * @swagger
 * /api/resultados:
 *   get:
 *     summary: Obtener todos los resultados
 *     tags: [Resultados]
 *     responses:
 *       200:
 *         description: Lista de resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resultados'
 *       500:
 *         description: Error del servidor
 */
router.get("/", getResultados);

/**
 * @swagger
 * /api/resultados:
 *   post:
 *     summary: Crear un nuevo resultado
 *     tags: [Resultados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_resultado
 *               - id_encuentro
 *               - goles_local
 *               - goles_visitantes
 *               - faltas_local
 *               - faltas_visitante
 *               - tarjetas_amarillas
 *               - tarjetas_rojas
 *               - observaciones
 *               - id_created_by
 *               - created_at
 *               
 *             properties:
 *               id_encuentro:
 *                  type: number
 *                  example: "2"
 *               goles_local:
 *                  type: number
 *                  example: "3"
 *               goles_visitantes:
 *                  type: number
 *                  example: "0"
 *               faltas_local:
 *                  type: number
 *                  example: "10"
 *               faltas_visitante:
 *                  type: number
 *                  example: "11"
 *               tarjetas_amarillas:
 *                  type: number
 *                  example: "5"
 *               tarjetas_rojas:
 *                  type: number
 *                  example: "0"
 *               observaciones:
 *                  type: string
 *                  example: "El partido fue interumpido por varias faltas"
 *               id_created_by:
 *                  type: number
 *                  example: "2"
 *               created_at:
 *                  type: date
 *                  example: "2026-03-22 12:03:32"
 *               
 *     responses:
 *       201:
 *         description: Resultado creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", agregarResultados);

/**
 * @swagger
 * /api/resultados/{id}:
 *   put:
 *     summary: Actualizar un resultado
 *     tags: [Resultados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del resultado
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
 *               id_encuentro:
 *                  type: number
 *               goles_local:
 *                  type: number
 *               goles_visitantes:
 *                  type: number
 *               faltas_local:
 *                  type: number
 *               faltas_visitante:
 *                  type: number
 *               tarjetas_amarillas:
 *                  type: number
 *               tarjetas_rojas:
 *                  type: number
 *               observaciones:
 *                  type: string
 *               id_created_by:
 *                  type: number
 *               created_at:
 *                  type: date
 *               
 *     responses:
 *       200:
 *         description: Resultado actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Resultado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", editarResultados);

/**
 * @swagger
 * /api/resultados/{id}:
 *   delete:
 *     summary: Eliminar una resultados
 *     tags: [Resultados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del resultado
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Resultado eliminado correctamente
 *       404:
 *         description: Resultado no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", eliminarResultados);

export default router;