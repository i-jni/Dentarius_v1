import express from 'express';
import { 
  getAllTopics, 
  getTopicById, 
  createTopic, 
  updateTopic, 
  deleteTopic 
} from '../controllers/topicController.js';

const topicRouter = express.Router();

topicRouter.get('/', getAllTopics);
topicRouter.get('/:id', getTopicById);
topicRouter.post('/', createTopic);
topicRouter.put('/:id', updateTopic);
topicRouter.delete('/:id', deleteTopic);

export default topicRouter;