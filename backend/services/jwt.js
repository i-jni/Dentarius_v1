import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "changeme-secret-key"; 

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, // payload
    SECRET_KEY,
    { expiresIn: "1h" } // expiration 1h
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};