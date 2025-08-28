import express from 'express';
import { 
  getAllStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../controllers/studentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from "../middleware/validate.js";
import { createStudentSchema, updateStudentSchema } from "../validators/schemas.js";

const studentRouter = express.Router();

/**
 * @swagger
 * /api/student:
 *   get:
 *     summary: Récupérer tous les étudiants
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Liste des étudiants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
studentRouter.get('/', getAllStudents);

/**
 * @swagger
 * /api/student/{id}:
 *   get:
 *     summary: Récupérer un étudiant par ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'étudiant
 *     responses:
 *       200:
 *         description: Détails de l'étudiant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Étudiant non trouvé
 */
studentRouter.get('/:id', getStudentById);

/**
 * @swagger
 * /api/student:
 *   post:
 *     summary: Créer un nouvel étudiant
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - countryId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               countryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Étudiant créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
studentRouter.post('/', authMiddleware, validate(createStudentSchema), createStudent);

/**
 * @swagger
 * /api/student/{id}:
 *   put:
 *     summary: Mettre à jour un étudiant
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'étudiant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               countryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Étudiant mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Étudiant non trouvé
 */
studentRouter.put('/:id', authMiddleware, validate(updateStudentSchema), updateStudent);

/**
 * @swagger
 * /api/student/{id}:
 *   delete:
 *     summary: Supprimer un étudiant
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'étudiant
 *     responses:
 *       204:
 *         description: Étudiant supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Étudiant non trouvé
 */
studentRouter.delete('/:id', authMiddleware, deleteStudent);

export default studentRouter;