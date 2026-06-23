import type { FastifyPluginAsync } from "fastify";
import { dashboardPayload } from "../services/dashboard.js";

export const dashboardRoutes: FastifyPluginAsync = async (app) => {
  app.get("/dashboard", async () => dashboardPayload);
};
