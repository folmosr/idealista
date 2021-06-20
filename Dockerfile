FROM node:12.13.0-alpine AS base
RUN apk update \
    && apk add curl \
    && apk add make \
    && apk add gcc \
    && apk add g++ \
    && apk add git \
    && apk add openssh \
    && apk add python \
    && rm -rf /var/cache/apk/* \
    && rm -fr /app/.cache/yarn/*

FROM base AS development

ENV APP_HOME /usr/src/app

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
COPY . $APP_HOME
EXPOSE 3000
CMD ["yarn", "run", "start:dev:full"]

FROM development AS builder
RUN yarn install --frozen-lockfile --non-interactive --cache-folder=/app/.cache/yarn \
    && rm -fr /app/.cache/yarn/*
RUN npx tsc --removeComments
RUN ls -alth

FROM node:12.13.0-alpine AS production
ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY --from=builder $APP_HOME/dist/ $APP_HOME/dist
COPY --from=builder $APP_HOME/node_modules/ $APP_HOME/node_modules
COPY --from=builder $APP_HOME/package.json $APP_HOME/package.json
COPY --from=builder $APP_HOME/yarn.lock $APP_HOME/yarn.lock

RUN pwd
RUN ls -alh $APP_HOME
RUN yarn install --cache-folder=/app/.cache/yarn --production=true \
    && rm -fr /app/.cache/yarn/*
EXPOSE 3000
CMD ["yarn", "run", "start"]
