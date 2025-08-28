import express from 'express';
import { 
  getAllTopics, 
  getTopicById, 
  createTopic, 
  updateTopic, 
  deleteTopic 
} from '../controllers/topicController.js';
import { validate } from "../middleware/validate.js";
import { createTopicSchema, updateTopicSchema } from "../validators/schemas.js";

const topicRouter = express.Router();

topicRouter.get('/', getAllTopics);
topicRouter.get('/:id', getTopicById);
topicRouter.post('/', validate(createTopicSchema), createTopic);
topicRouter.put('/:id', validate(updateTopicSchema), updateTopic);
topicRouter.delete('/:id', deleteTopic);

export default topicRouter;