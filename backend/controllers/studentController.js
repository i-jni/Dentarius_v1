import prisma from '../services/prismaClient.js';

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await prisma.student.findMany({
      include: { country: true }
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      include: { country: true }
    });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, countryId } = req.body;
    
    const newStudent = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        countryId: parseInt(countryId)
      },
      include: { country: true }
    });
    
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, countryId } = req.body;
    
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        countryId: parseInt(countryId)
      },
      include: { country: true }
    });
    
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.student.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};