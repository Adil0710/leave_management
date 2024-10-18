import { z } from 'zod';

export const employeeSchema = z.object({
  employeeId: z.string().min(1, {message: 'Employee ID is required'}),
  name: z.string().min(2, {message: 'Name must be at least 2 characters'}),
  email: z.string().email({message: 'Invalid email address'}),
  department: z.string().min(1, {message: 'Department is required'}),
  designation: z.string().min(1, {message: 'Designation is required'}),
  profilePhoto: z.string().url({message: 'Invalid URL'}).optional(),
  isAdmin: z.boolean().optional().default(false), // New field
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
