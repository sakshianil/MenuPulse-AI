import type { FastifyPluginAsync } from "fastify";
import { Type } from "@sinclair/typebox";
import { copilotRequestSchema } from "@menupulse/shared";
import { assessPrompt } from "../lib/security.js";
import { generateRecommendation, promptHash } from "../services/copilot.js";

export const copilotRoutes: FastifyPluginAsync = async (app) => {
  app.post(
    "/copilot",
    {
      schema: {
        body: Type.Object(
          {
            question: Type.String({ minLength: 3, maxLength: 500 }),
            restaurantId: Type.Optional(Type.String({ format: "uuid" }))
          },
          { additionalProperties: false }
        )
      }
    },
    async (request, reply) => {
      const input = copilotRequestSchema.parse(request.body);
      const assessment = assessPrompt(input.question);
      if (!assessment.safe) {
        return reply.code(422).send({
          error: "unsafe_prompt",
          message: assessment.reason
        });
      }

      const startedAt = performance.now();
      const result = await generateRecommendation(input.question);
      return {
        ...result,
        promptHash: promptHash(input.question),
        latencyMs: Math.round(performance.now() - startedAt)
      };
    }
  );
};
