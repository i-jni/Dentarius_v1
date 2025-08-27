import prisma from '../services/prismaClient.js';

export const getAllCountries = async (req, res, next) => {
  try {
    const countries = await prisma.country.findMany({
      include: { students: true }
    });
    res.json(countries);
  } catch (error) {
    next(error);
  }
};

export const getCountryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const country = await prisma.country.findUnique({
      where: { id: parseInt(id) },
      include: { students: true }
    });
    
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    res.json(country);
  } catch (error) {
    next(error);
  }
};

export const createCountry = async (req, res, next) => {
  try {
    const { name } = req.body;
    
    const newCountry = await prisma.country.create({
      data: { name }
    });
    
    res.status(201).json(newCountry);
  } catch (error) {
    next(error);
  }
};

export const updateCountry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const updatedCountry = await prisma.country.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    
    res.json(updatedCountry);
  } catch (error) {
    next(error);
  }
};

export const deleteCountry = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    await prisma.country.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
