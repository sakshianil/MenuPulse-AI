import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { config } from "./config.js";
import { dashboardRoutes } from "./routes/dashboard.js";
import { copilotRoutes } from "./routes/copilot.js";
import { experimentRoutes } from "./routes/experiments.js";

export function buildApp() {
  const app = Fastify({
    logger: config.NODE_ENV !== "test",
    bodyLimit: 64 * 1024,
    requestIdHeader: "x-request-id"
  });

  app.register(helmet);
  app.register(cors, {
    origin: config.APP_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true
  });
  app.register(rateLimit, {
    max: 60,
    timeWindow: "1 minute",
    keyGenerator: (request) => request.ip
  });

  app.get("/health", async () => ({ status: "ok", model: config.LLM_MODEL, demoMode: config.DEMO_MODE }));
  app.register(dashboardRoutes, { prefix: "/api" });
  app.register(copilotRoutes, { prefix: "/api" });
  app.register(experimentRoutes, { prefix: "/api" });

  app.setErrorHandler((error, _request, reply) => {
    const typedError = error as Error & { statusCode?: number };
    const statusCode = typedError.statusCode && typedError.statusCode < 500 ? typedError.statusCode : 500;
    reply.code(statusCode).send({
      error: statusCode === 500 ? "internal_error" : "request_error",
      message: statusCode === 500 ? "The request could not be completed." : typedError.message
    });
  });

  return app;
}
