import { z } from "zod";

export const leaveRequestSchema = z.object({
    employee: z.string().min(1, {message: 'Employee ID is required'}), // Can validate employee ID separately
    fromDate: z.date({ message: 'From date is required' }),
    toDate: z.date({ message: 'To date is required' }),
    reason: z.string().min(5, {message: 'Reason must be at least 5 characters'}),
    leaveType: z.string().min(1, {message: 'Leave type is required'}),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  });
  