import prisma from '../services/prismaClient.js';

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    next(error);
  }
};