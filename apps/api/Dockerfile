FROM node:20-alpine AS build
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN pnpm install --filter @menupulse/api... --frozen-lockfile=false
COPY apps/api apps/api
COPY packages/shared packages/shared
RUN pnpm --filter @menupulse/api build

FROM node:20-alpine
RUN corepack enable
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["pnpm", "--filter", "@menupulse/api", "start"]
