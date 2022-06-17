FROM node:16-alpine as BUILD_STAGE

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn lerna run build --scope client

RUN yarn install --production

FROM node:16-alpine as FINAL_STAGE

WORKDIR /app

COPY --chown=node:node --from=BUILD_STAGE /app/node_modules /app/node_modules
COPY --chown=node:node --from=BUILD_STAGE /app/server /app/server
COPY --chown=node:node --from=BUILD_STAGE /app/client/build /app/server/public

EXPOSE 3000

USER node

ENTRYPOINT ["node"]

CMD ["/app/server/bin/www"]
