import express from "express";
import { getUsuarios,
     crearUsuarios,
      editarUsuarios, 
      eliminarUsuarios } from "../controllers/usuarios.controller.js";


const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Usuarios 
 *   description: API para gestión de encuentros de fútbol
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuarios:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: string
 *           example: "541315a54dq54e"
 *         nombre:
 *           type: string
 *           example: "121542"
 *         email:
 *           type: string
 *           example: "Los tigre S.C"
 *         rol:
 *           type: string
 *           example: "PEPITO"
 *         activo:
 *           type: string
 *           example: "PEPITO"
 *         fecha_actualizado:
 *           type: string
 *           example: "PEPITO"
 *         
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuarios'
 *       500:
 *         description: Error del servidor
 */
router.get("/", getUsuarios);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - nombre
 *               - email
 *               - password
 *               - rol
 *               - activo
 *               - fecha_actualizado
 *               
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "541315a54dq54e"
 *               email:
 *                 type: string
 *                 example: "sub20_2026"
 *               password:
 *                 type: string
 *                 example: "equipo_local_id"
 *               rol:
 *                 type: string
 *                 example: "equipo_visitante_id"
 *               activo:
 *                 type: string
 *                 example: "equipo_visitante_id"
 *               fecha_actualizado:
 *                 type: string
 *                 example: "equipo_visitante_id"
 *               
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/", crearUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
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
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: date
 *               rol:
 *                 type: string
 *                 format: date
 *               activo:
 *                 type: string
 *                 format: date
 *               fecha_actualizado:
 *                 type: string
 *                 format: date
 *               
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/:id", editarUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", eliminarUsuarios);

export default router;


