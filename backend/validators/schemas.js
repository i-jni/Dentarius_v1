import { z } from "zod";

// Auth schemas
export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  countryId: z.coerce.number().int().positive()
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});

// Student schemas
export const createStudentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  countryId: z.coerce.number().int().positive()
});

export const updateStudentSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  countryId: z.coerce.number().int().positive().optional()
});

// Course schemas
export const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  levelId: z.coerce.number().int().positive()
});

export const updateCourseSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  levelId: z.coerce.number().int().positive().optional()
});

// Topic schemas
export const createTopicSchema = z.object({
  name: z.string().min(1, "Name is required")
});

export const updateTopicSchema = z.object({
  name: z.string().min(1, "Name is required")
});

// Level schemas
export const createLevelSchema = z.object({
  name: z.string().min(1, "Name is required")
});

export const updateLevelSchema = z.object({
  name: z.string().min(1, "Name is required")
});

// Country schemas
export const createCountrySchema = z.object({
  name: z.string().min(1, "Name is required")
});

export const updateCountrySchema = z.object({
  name: z.string().min(1, "Name is required")
});

// CourseTopic schemas
export const courseTopicSchema = z.object({
  courseId: z.coerce.number().int().positive(),
  topicId: z.coerce.number().int().positive()
});