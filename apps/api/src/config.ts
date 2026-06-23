import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  APP_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URL: z.string().default("postgresql://menupulse:menupulse@localhost:5432/menupulse"),
  LLM_API_KEY: z.string().optional(),
  LLM_BASE_URL: z.string().url().default("https://openrouter.ai/api/v1"),
  LLM_MODEL: z.string().default("z-ai/glm-5.1"),
  LLM_TIMEOUT_MS: z.coerce.number().int().positive().default(20000),
  DEMO_MODE: z
    .string()
    .default("true")
    .transform((value) => value === "true")
});

export const config = configSchema.parse(process.env);
