import express from 'express';
import { 
  getAllLevels, 
  getLevelById, 
  createLevel, 
  updateLevel, 
  deleteLevel 
} from '../controllers/levelController.js';
import { validate } from "../middleware/validate.js";
import { createLevelSchema, updateLevelSchema } from "../validators/schemas.js";

const levelRouter = express.Router();

levelRouter.get('/', getAllLevels);
levelRouter.get('/:id', getLevelById);
levelRouter.post('/', validate(createLevelSchema), createLevel);
levelRouter.put('/:id', validate(updateLevelSchema), updateLevel);
levelRouter.delete('/:id', deleteLevel);

export default levelRouter;