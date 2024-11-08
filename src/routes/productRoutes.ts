import { Router } from "express";
import {
  getAllJuegosya,
  getJuegosyaById,
  createJuegosya,
  updateJuegosya,
  deleteJuegosya,
} from "../controllers/productController";

const productRoutes = Router();

/**
 * @swagger
 * tags: 
 *   name: Juegosya
 *   description: CRUD relacionado con productos
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Juegosya]
 *     responses:  
 *       200:
 *         description: Lista de productos
 */
productRoutes.get("/", getAllJuegosya);

/**
 * @swagger
 * /api/product/{id}:
 *     get:
 *       summary: Obtener un producto por ID
 *       tags: [Juegosya]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID del producto
 *       responses:
 *          200:
 *            description: Detalles del producto
 *          404:
 *            description: Producto no encontrado
 */
productRoutes.get("/:id", getJuegosyaById);

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Juegosya]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado
 *       500:
 *         description: Error en el servidor
 */
productRoutes.post("/", createJuegosya);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Juegosya]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               description: 
 *                 type: string
 *               price: 
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
productRoutes.put("/:id", updateJuegosya);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Juegosya]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
productRoutes.delete("/:id", deleteJuegosya);

export default productRoutes;