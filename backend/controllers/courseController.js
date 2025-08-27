import prisma from '../services/prismaClient.js';

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({
      include: { 
        level: true,
        topics: {
          include: { topic: true }
        }
      }
    });
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: { 
        level: true,
        topics: {
          include: { topic: true }
        }
      }
    });
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, levelId } = req.body;
    
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        levelId: parseInt(levelId)
      },
      include: { level: true }
    });
    
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, levelId } = req.body;
    
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        levelId: parseInt(levelId)
      },
      include: { level: true }
    });
    
    res.json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.course.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};