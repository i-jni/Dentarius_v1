import express from 'express';
import { getAllStudents } from '../controllers/studentController.js';

const studentRouter = express.Router();
studentRouter.get('/', getAllStudents);

export default studentRouter ;