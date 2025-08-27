import prisma from '../services/prismaClient.js';

export const getAllTopics = async (req, res, next) => {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        courses: {
          include: { course: true }
        }
      }
    });
    res.json(topics);
  } catch (error) {
    next(error);
  }
};

export const getTopicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await prisma.topic.findUnique({
      where: { id: parseInt(id) },
      include: {
        courses: {
          include: { course: true }
        }
      }
    });
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    
    res.json(topic);
  } catch (error) {
    next(error);
  }
};

export const createTopic = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    const newTopic = await prisma.topic.create({
      data: { name }
    });
    
    res.status(201).json(newTopic);
  } catch (error) {
    next(error);
  }
};

export const updateTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const updatedTopic = await prisma.topic.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    
    res.json(updatedTopic);
  } catch (error) {
    next(error);
  }
};

export const deleteTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.topic.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};