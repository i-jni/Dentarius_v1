import express from 'express';
import { 
  addTopicToCourse, 
  removeTopicFromCourse, 
  getCourseTopics 
} from '../controllers/courseTopicController.js';
import { validate } from "../middleware/validate.js";
import { courseTopicSchema } from "../validators/schemas.js";

const courseTopicRouter = express.Router();

courseTopicRouter.get('/course/:courseId', getCourseTopics);
courseTopicRouter.post('/', validate(courseTopicSchema), addTopicToCourse);
courseTopicRouter.delete('/:courseId/:topicId', removeTopicFromCourse);

export default courseTopicRouter;