ARG MONGODB_USERNAME
ARG MONGODB_PASSWORD
ARG API_KEY
FROM node:18-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json .
COPY --chown=node:node . .
RUN npm ci
RUN --mount=type=secret,id=db_user
RUN --mount=type=secret,id=db_pass
RUN --mount=type=secret,id=api_key
USER node
CMD npm run dev
