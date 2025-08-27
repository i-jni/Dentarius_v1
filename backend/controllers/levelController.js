import prisma from '../services/prismaClient.js';

export const getAllLevels = async (req, res, next) => {
  try {
    const levels = await prisma.level.findMany({
      include: { courses: true }
    });
    res.json(levels);
  } catch (error) {
    next(error);
  }
};

export const getLevelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const level = await prisma.level.findUnique({
      where: { id: parseInt(id) },
      include: { courses: true }
    });
    
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    
    res.json(level);
  } catch (error) {
    next(error);
  }
};

export const createLevel = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    const newLevel = await prisma.level.create({
      data: { name }
    });
    
    res.status(201).json(newLevel);
  } catch (error) {
    next(error);
  }
};

export const updateLevel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const updatedLevel = await prisma.level.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    
    res.json(updatedLevel);
  } catch (error) {
    next(error);
  }
};

export const deleteLevel = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.level.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};