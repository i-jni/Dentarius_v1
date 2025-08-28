import express from 'express';
import { 
  getAllCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from '../controllers/courseController.js';
import { validate } from "../middleware/validate.js";
import { createCourseSchema, updateCourseSchema } from "../validators/schemas.js";

const courseRouter = express.Router();

courseRouter.get('/', getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.post('/', validate(createCourseSchema), createCourse);
courseRouter.put('/:id', validate(updateCourseSchema), updateCourse);
courseRouter.delete('/:id', deleteCourse);

export default courseRouter;