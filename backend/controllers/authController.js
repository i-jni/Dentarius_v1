import prisma from '../services/prismaClient.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, countryId } = req.body;
    
   
    const existingUser = await prisma.student.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
   
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Créer l'utilisateur
    const newUser = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        countryId: parseInt(countryId)
      }
    });
    
    // Retourner sans le mot de passe
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Trouver l'utilisateur
    const user = await prisma.student.findUnique({
      where: { email },
      include: { country: true }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Retourner sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    res.json({ message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};