import z from 'zod';

const zodEnvSchema = z.object({
  JWT_EXPIRATION_IN_SEC: z.coerce.number().int().min(60).max(60 * 60),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.url(),
})

export const loadAndValidateEnv = () => {
  const env = zodEnvSchema.parse(process.env)

  return {
    database: {
      url: env.DATABASE_URL,
    },
    jwt: {
      expirationInSeconds: env.JWT_EXPIRATION_IN_SEC,
      secret: env.JWT_SECRET,
    },
  }
}

export type Env = ReturnType<typeof loadAndValidateEnv>
