import prisma from "../services/prismaClient.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, countryId } = req.body;

    const existingUser = await prisma.student.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.student.create({
      data: { firstName, lastName, email, password: hashedPassword, countryId: parseInt(countryId) },
    });

    const token = generateToken(newUser);
    const { password: _, ...userWithoutPass } = newUser;

    res.status(201).json({ message: "User created successfully", user: userWithoutPass, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.student.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    const { password: _, ...userWithoutPass } = user;

    res.json({ message: "Login successful", user: userWithoutPass, token });
  } catch (error) {
    next(error);
  }
};