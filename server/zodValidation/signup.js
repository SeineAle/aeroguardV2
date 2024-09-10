import { z } from 'zod';

const userSignupSchema = z.object({
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(10),
  });

export default userSignupSchema;