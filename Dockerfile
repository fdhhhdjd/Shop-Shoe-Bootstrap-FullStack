FROM node:14-alpine3.12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV NODE_ENV =production
COPY ["package.json","package-lock.json","./"]
RUN npm install -g nodemon && npm install --production
COPY . .
EXPOSE 5000
CMD [ "npm","run","dev"]