FROM node:16.17.1 as builder

ENV NODE_ENV=build

WORKDIR /app

COPY . .

RUN rm -rf node_modules \
    && yarn install --frozen-lockfile \
    && yarn run build

FROM node:16.17.1

ENV NODE_ENV=production

USER root
WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/dist/ /app/dist/

CMD ["node", "dist/server.js"]
