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

// Routes publiques (non protégées)
studentRouter.get('/', getAllStudents);
studentRouter.get('/:id', getStudentById);

// Routes protégées (nécessitent JWT) + validation
studentRouter.post('/', authMiddleware, validate(createStudentSchema), createStudent);
studentRouter.put('/:id', authMiddleware, validate(updateStudentSchema), updateStudent);
studentRouter.delete('/:id', authMiddleware, deleteStudent);

export default studentRouter;