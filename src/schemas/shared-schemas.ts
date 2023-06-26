import { z } from 'zod';

export const showRecordSchema = z
  .object({
    id: z.string(),
  })
  .required();
