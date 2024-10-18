import { z } from 'zod';
export const designationSchema = z.object({
    name: z.string().min(2, {message: 'Designation name must be at least 2 characters'}),
  });
  