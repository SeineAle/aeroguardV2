import { z } from 'zod';

const postCreateSchema = z.object({
  authorId: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  categoryId: z.string().min(1),
  risk: z.enum(['low', 'medium', 'high', 'nightmare']),
  status: z.enum(['active', 'resolved']).optional(),
  createdAt: z.date().default(() => new Date()),
  publishedAt: z.date().optional().nullable(),
});

export default postCreateSchema;
