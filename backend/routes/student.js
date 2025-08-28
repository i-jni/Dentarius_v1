import express from 'express';
import { 
  getAllStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../controllers/studentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const studentRouter = express.Router();

// Routes publiques (non protégées) pour l'instant...
studentRouter.get('/', getAllStudents);
studentRouter.get('/:id', getStudentById);

// Routes protégées (nécessitent JWT)
studentRouter.post('/', authMiddleware, createStudent);
studentRouter.put('/:id', authMiddleware, updateStudent);
studentRouter.delete('/:id', authMiddleware, deleteStudent);

export default studentRouter;