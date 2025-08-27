import express from 'express';
import { 
  getAllLevels, 
  getLevelById, 
  createLevel, 
  updateLevel, 
  deleteLevel 
} from '../controllers/levelController.js';

const levelRouter = express.Router();

levelRouter.get('/', getAllLevels);
levelRouter.get('/:id', getLevelById);
levelRouter.post('/', createLevel);
levelRouter.put('/:id', updateLevel);
levelRouter.delete('/:id', deleteLevel);

export default levelRouter;