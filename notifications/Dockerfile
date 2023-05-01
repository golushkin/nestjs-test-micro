FROM node:16.20.0-alpine3.17 as builder
WORKDIR /vaw/www/service
COPY . .
RUN npm i -E --omit=dev
RUN npm i -g @nestjs/cli@9.4.0
RUN npm run build

FROM node:16.20.0-alpine3.17
WORKDIR /vaw/www/service
COPY --from=builder /vaw/www/service/node_modules ./node_modules
COPY --from=builder /vaw/www/service/dist ./dist
CMD node dist/main