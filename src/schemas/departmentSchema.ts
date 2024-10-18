import { z } from 'zod';
export const departmentSchema = z.object({
    name: z.string().min(2, {message:'Department name must be at least 2 characters'}),
  });
  