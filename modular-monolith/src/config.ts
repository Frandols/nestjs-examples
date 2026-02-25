import dotenv from 'dotenv';
import { z } from 'zod/v4';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string().nonempty('DB_HOST is required'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string().nonempty('DB_USERNAME is required'),
  DB_PASSWORD: z.string().nonempty('DB_PASSWORD is required'),
  DB_NAME: z.string().nonempty('DB_NAME is required'),

  DB_SYNCHRONIZE: z
    .enum(['true', 'false'])
    .default('false')
    .transform((val) => val === 'true'),
  DB_LOGGING: z
    .enum(['true', 'false'])
    .default('false')
    .transform((val) => val === 'true'),

  REDIS_URL: z.url('REDIS_URL must be a valid URL'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    'Invalid environment variables:\n',
    z.prettifyError(parsed.error),
  );

  process.exit(1);
}

export const config = parsed.data;

export type Config = z.infer<typeof envSchema>;
