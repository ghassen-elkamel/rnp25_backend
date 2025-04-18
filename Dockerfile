###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN  apk add  chromium
RUN npx puppeteer browsers install chrome
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN npm i

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=development /usr/src/app/assets ./assets


COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm i

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/assets ./assets


CMD [ "node", "dist/main" ]
