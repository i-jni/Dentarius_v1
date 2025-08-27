import express from 'express';
import { 
  addTopicToCourse, 
  removeTopicFromCourse, 
  getCourseTopics 
} from '../controllers/courseTopicController.js';

const courseTopicRouter = express.Router();

courseTopicRouter.post('/', addTopicToCourse);
courseTopicRouter.delete('/:courseId/:topicId', removeTopicFromCourse);
courseTopicRouter.get('/course/:courseId', getCourseTopics);

export default courseTopicRouter;