import z from 'zod';

const zodEnvSchema = z.object({
  DATABASE_URL: z.url(),
  IA_API_KEY: z.string(),
  JWT_EXPIRATION_IN_SEC: z.coerce.number().int().min(60).max(60 * 60),
  JWT_SECRET: z.string(),
})

export const loadAndValidateEnv = () => {
  const env = zodEnvSchema.parse(process.env)

  return {
    database: {
      url: env.DATABASE_URL,
    },
    ia: {
      apiKey: env.IA_API_KEY,
    },
    jwt: {
      expirationInSeconds: env.JWT_EXPIRATION_IN_SEC,
      secret: env.JWT_SECRET,
    },
  }
}

export type Env = ReturnType<typeof loadAndValidateEnv>
