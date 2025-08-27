import prisma from '../services/prismaClient.js';

export const addTopicToCourse = async (req, res, next) => {
  try {
    const { courseId, topicId } = req.body;
    
    const courseTopic = await prisma.courseTopic.create({
      data: {
        courseId: parseInt(courseId),
        topicId: parseInt(topicId)
      },
      include: {
        course: true,
        topic: true
      }
    });
    
    res.status(201).json(courseTopic);
  } catch (error) {
    next(error);
  }
};

export const removeTopicFromCourse = async (req, res, next) => {
  try {
    const { courseId, topicId } = req.params;
    
    await prisma.courseTopic.delete({
      where: {
        courseId_topicId: {
          courseId: parseInt(courseId),
          topicId: parseInt(topicId)
        }
      }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getCourseTopics = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    
    const courseTopics = await prisma.courseTopic.findMany({
      where: { courseId: parseInt(courseId) },
      include: { topic: true }
    });
    
    res.json(courseTopics);
  } catch (error) {
    next(error);
  }
};