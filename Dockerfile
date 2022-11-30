FROM node:18-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json .
COPY --chown=node:node . .
RUN npm ci 
USER node
CMD npm run dev
