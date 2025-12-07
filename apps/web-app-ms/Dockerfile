FROM node:22

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 4173

CMD ["pnpm", "run", "preview", "--host", "0.0.0.0", "--port", "4173"]
