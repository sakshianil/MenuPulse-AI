import type { FastifyPluginAsync } from "fastify";
import { Type } from "@sinclair/typebox";
import { randomUUID } from "node:crypto";

export const experimentRoutes: FastifyPluginAsync = async (app) => {
  app.post(
    "/experiments",
    {
      schema: {
        body: Type.Object(
          {
            title: Type.String({ minLength: 8, maxLength: 120 }),
            hypothesis: Type.String({ minLength: 10, maxLength: 220 }),
            durationDays: Type.Integer({ minimum: 3, maximum: 30 }),
            primaryMetric: Type.String({ minLength: 3, maxLength: 80 }),
            guardrailMetric: Type.String({ minLength: 3, maxLength: 80 }),
            expectedImpact: Type.Number({ minimum: -100000, maximum: 100000 })
          },
          { additionalProperties: false }
        )
      }
    },
    async (request, reply) => {
      return reply.code(201).send({
        id: randomUUID(),
        status: "DRAFT",
        createdAt: new Date().toISOString(),
        ...(request.body as object)
      });
    }
  );
};
